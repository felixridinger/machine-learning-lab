import os
import shutil

from universal_build import build_utils

COMPONENT_NAME = "lab-service"

args = build_utils.get_sanitized_arguments()

if args[build_utils.FLAG_MAKE]:
    completed_process = build_utils.run("mvn package")
    if completed_process.returncode > 0:
        build_utils.log("Failed to compile project")
        build_utils.exit_process(1)

    version_build_arg = " --build-arg service_version=" + args[build_utils.FLAG_VERSION]
    completed_process = build_utils.build_docker_image(
        COMPONENT_NAME, args[build_utils.FLAG_VERSION], version_build_arg
    )
    if completed_process.returncode > 0:
        build_utils.exit_process(completed_process.returncode)

if args[build_utils.FLAG_TEST]:
    build_utils.log("Run docker tests")
    completed_process = build_utils.run("mvn verify")
    if completed_process.returncode > 0:
        build_utils.log(f"Tests failed in local mode for component {COMPONENT_NAME}")
        build_utils.exit_process(1)

    if shutil.which("kind") is not None and build_utils.run("kind get clusters").stderr == '':
        kind_cluster_name = os.getenv("kind_cluster_name", "kind")
        build_utils.log("Run Kubernetes tests")
        build_utils.run(
            f"kind --name {kind_cluster_name} load docker-image lab-service:{args[build_utils.FLAG_VERSION]}",
            exit_on_error=True,
        )
        build_utils.run(
            f"kind --name {kind_cluster_name} load docker-image simple-demo-service:{args[build_utils.FLAG_VERSION]}",
            exit_on_error=True,
        )
        build_utils.run(
            f"kind --name {kind_cluster_name} load docker-image simple-demo-job:{args[build_utils.FLAG_VERSION]}",
            exit_on_error=True,
        )
        completed_process = build_utils.run(
            f"SERVICES_RUNTIME=k8s \
            KUBE_CONFIG_PATH=kube-config \
            LAB_DATA_ROOT=/workspace/data \
            SERVICE_VERSION={args[build_utils.FLAG_VERSION]} \
            IS_KIND_CLUSTER=True \
            mvn verify"
        )
        if completed_process.returncode > 0:
            build_utils.log(
                f"Tests failed in Kubernetes mode for component {COMPONENT_NAME}"
            )
            build_utils.exit_process(1)
    else:
        build_utils.log("Skipping Kubernetes tests because kind is not installed.")

# Only allow releasing from sub componenents when force flag is set as an extra precaution step
if args[build_utils.FLAG_RELEASE] and args[build_utils.FLAG_FORCE]:
    build_utils.release_docker_image(
        COMPONENT_NAME,
        args[build_utils.FLAG_VERSION],
        args[build_utils.FLAG_DOCKER_IMAGE_PREFIX],
    )
