// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    baseUrl: 'https://jsonplaceholder.typicode.com/posts', // Replace with your actual base URL
    reconnectInterval: 3000, // 3 seconds
    jwt: {
      securityKey: "SecurityKeySecurityKeySecurityKeySecurityKey", // Backend'deki Token:SecurityKey değeri ile aynı olmalı
      issuer: "hksapi",
      audience: "offlinehks"
    },
    // allowedDomains: ["localhost:4200"],
    allowedDomains: [window.location.host],
    disallowedRoutes: [],
    skipWhenExpired: true,
    throwNoTokenError: true,
    idleTimeoutConfig: {
      kapiUser: {
        warningMinutes: 9,
        timeoutMinutes: 10
      },
      default: {
        warningMinutes: 9,
        timeoutMinutes: 10
      }
    }
  };