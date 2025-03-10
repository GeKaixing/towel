
  declare module "*.svg" {
    const content: string;
    export default content;
  }
  declare var process: {
    env: {
      [key: string]: string | undefined;
    };
  };