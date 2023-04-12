import { showHUD } from "@raycast/api";
import sudo from "sudo-prompt";

const flushDNS = async (): Promise<void> =>
  new Promise((resolve, reject) => {
    const home = process.env.HOME;
    if (!home) return reject(new Error("HOME environment variable not set"));
    process.env.USER = home.split("/")[2];

    sudo.exec("dscacheutil -flushcache; killall -HUP mDNSResponder", { name: "Raycast" }, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });

export default async function main() {
  await flushDNS();

  await showHUD("DNS cache flushed");
}
