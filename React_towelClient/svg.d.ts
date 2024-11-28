
  declare module "*.svg" {
    import React from "react";
    const content: string;
    export default content;
  }
  declare var process: {
    env: {
      [key: string]: string | undefined;
    };
  };