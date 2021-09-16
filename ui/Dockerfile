FROM adoptopenjdk/openjdk11:latest
WORKDIR /opt
ENV PORT 8000
EXPOSE 8000
COPY build/libs/ui-0.0.1-SNAPSHOT.jar /opt/recipebook-ui.jar
ENTRYPOINT exec java $JAVA_OPTS -jar recipebook-ui.jar --spring.profiles.active=demo