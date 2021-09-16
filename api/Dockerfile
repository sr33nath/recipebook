FROM adoptopenjdk/openjdk11:latest
WORKDIR /opt
ENV PORT 9000
EXPOSE 9000
COPY build/libs/api-0.0.1-SNAPSHOT.jar /opt/recipebook-api.jar
ENTRYPOINT exec java $JAVA_OPTS -jar recipebook-api.jar --spring.profiles.active=demo