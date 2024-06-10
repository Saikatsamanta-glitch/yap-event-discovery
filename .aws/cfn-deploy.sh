################################################
#                                              #
#       DO NOT CHANGE CODE BELOW THIS          #
#                                              #
################################################
. ./.aws/config.sh
ENV=$1
REVISION_NUMBER=$2
TAG_VALUE=yap-$ENV
STACK_NAME=$ENV-${SERVICE_NAME}-stack
TEMPLATE=./.aws/cloudformation.yml
REGION=$3
echo "REGION : $REGION";

echo "<====> Checking Cloudformation Staus <====>"
STATUS="$(aws --region $REGION cloudformation describe-stack-events --stack-name $STACK_NAME  --query=StackEvents[0].ResourceStatus --output=text)"
echo $STATUS

for type in "CREATE_IN_PROGRESS" "UPDATE_IN_PROGRESS" "UPDATE_ROLLBACK_IN_PROGRESS" "DELETE_IN_PROGRESS" "CREATE_FAILED" "DELETE_FAILED" "ROLLBACK_FAILED"
do
  if [ "$type" = "$STATUS" ];  then
    echo "Invalid stack status for deploy : $STATUS";
    exit 1;
  fi
done


echo "<====> Updating Cloudformation <====>"

STACK="$(aws --region $REGION cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].StackName" --output text)"
if [ -z "$STACK" ]; then
	STACK_ACTION=create
  echo "cfn stack not present, creating stack : $STACK_NAME"
else 
	STACK_ACTION=update
  echo "cfn stack present, updating stack : $STACK_NAME"
fi

RESULT=$(aws --region $REGION cloudformation ${STACK_ACTION}-stack --stack-name $STACK_NAME --template-body file://${TEMPLATE} --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=ServiceName,ParameterValue=${SERVICE_NAME} ParameterKey=ServiceDatabaseName,ParameterValue=${DATABASE_NAME} ParameterKey=EnvironmentName,ParameterValue=$1 ParameterKey=ContainerPort,ParameterValue=${CONTAINER_PORT} ParameterKey=ContainerMemory,ParameterValue=${MEMORY} ParameterKey=ContainerCpu,ParameterValue=${CPU} ParameterKey=RevisionNumber,ParameterValue=${REVISION_NUMBER} --tags Key=project,Value=${TAG_VALUE})
if [ ! -z "$RESULT" ]; then 
  echo "Cloudformation stack ${STACK_ACTION}d : $STACK_NAME"
else
  echo "Cloudformation stack ${STACK_ACTION} failed : $STACK_NAME"
  exit 1
fi
