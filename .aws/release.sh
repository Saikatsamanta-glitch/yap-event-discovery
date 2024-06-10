SERVICE_NAME=presenter-interface
SENTRY_ENVIRONMENT=$1
export SENTRY_AUTH_TOKEN=$2
export SENTRY_ORG=$3

SENTRY_RELEASE=$(sed 's/.*"version": "\(.*\)".*/\1/;t;d' ./package.json)

sentry-cli releases new -p $SERVICE_NAME $SENTRY_RELEASE --log-level INFO
sentry-cli releases set-commits $SENTRY_RELEASE --auto --log-level INFO
sentry-cli releases finalize $SENTRY_RELEASE --log-level INFO
sentry-cli releases deploys $SENTRY_RELEASE new -e $SENTRY_ENVIRONMENT --log-level INFO




 