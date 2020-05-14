interface GRecaptcha {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options?: { action: string }) => Promise<string>;
}

export const getCaptcha = async () => {
  return new Promise((resolve: (value?: string) => void) => {
    //@ts-ignore
    (grecaptcha as GRecaptcha).ready(() => {
      //@ts-ignore
      (grecaptcha as GRecaptcha)
        .execute('6Lc2ReUUAAAAAM-UBGGFTLOELBlVRme90hR-F1AM')
        .then((token) => {
          resolve(token);
        });
    });
  });
};
