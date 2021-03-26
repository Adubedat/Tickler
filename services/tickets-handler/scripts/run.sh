#   By default (without ENVIRONMENT set) we run as "dev"
if [ -z "${ENVIRONMENT}" ]
then
	ENVIRONMENT="dev"
fi

echo -ne "\n\n##\n##\tRunning with environment=\"${ENVIRONMENT}\"\n##\n\n"
if [ "${ENVIRONMENT}" == "prod" ]
then
	npm run build
fi

if [ "${ENVIRONMENT}" == "test" ]
then
	npm i
  npm run test
fi

if [ "${ENVIRONMENT}" == "coverage" ]
then
	npm i
  npm run test:cov
fi

if [ "${ENVIRONMENT}" == "dev" ]
then
	npm i
  npm run start:dev
fi