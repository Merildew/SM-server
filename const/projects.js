const src = "https://sm-spring-api.herokuapp.com/images/";

const SpringBoot = `${src}spring-boot.svg`;
const SpringFramework = `${src}spring-framework.svg`;
const SpringData = `${src}spring-data.svg`;
const SpringCloud = `${src}spring-cloud.svg`;
const SpringDataFlow = `${src}spring-data-flow.svg`;
const SpringSecurity = `${src}spring-security.svg`;

exports.PROJECTS = [
  {
    src: SpringBoot,
    title: "Spring Boot",
    text: "Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible.",
  },
  {
    src: SpringFramework,
    title: "Spring Framework",
    text: "Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.",
  },
  {
    src: SpringData,
    title: "Spring Data",
    text: "Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.",
  },
  {
    src: SpringCloud,
    title: "Spring Cloud",
    text: "Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.",
  },
  {
    src: SpringDataFlow,
    title: "Spring Cloud Data Flow",
    text: "Provides an orchestration service for composable data microservice applications on modern runtimes.",
  },
  {
    src: SpringSecurity,
    title: "Spring Security",
    text: "Protects your application with comprehensive and extensible authentication and authorization support.",
  },
];
