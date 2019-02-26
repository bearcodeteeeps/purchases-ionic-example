import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";

declare let Purchases;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(public platform: Platform) {
    platform.ready().then(() => {
      Purchases.setDebugLogsEnabled(true);
      Purchases.setup(
        "LQmxAoIaaQaHpPiWJJayypBDhIpAZCZN",
        "purchases_sample_id_4"
      );
      console.log("PURCHASES setup");
      Purchases.setAllowSharingStoreAccount(true);
      Purchases.setUpdatedPurchaserInfoListener(info => {
        console.log(
          "PURCHASES updatedPurchaserInfoReceived " + JSON.stringify(info)
        );
      });
      Purchases.removeUpdatedPurchaserInfoListener();
      Purchases.getPurchaserInfo(info => {
        console.log("PURCHASES getPurchaserInfo " + JSON.stringify(info));
      });
      Purchases.setUpdatedPurchaserInfoListener(info => {
        console.log(
          "PURCHASES updatedPurchaserInfoReceived " + JSON.stringify(info)
        );
      });
      Purchases.identify(
        "purchases_sample_id_4",
        info => {
          console.log("PURCHASES identify " + JSON.stringify(info));
        },
        error => {
          console.log("PURCHASES identify " + JSON.stringify(error));
        }
      );
      Purchases.getProducts(
        ["onemonth_freetrial"],
        products => {
          console.log("PURCHASES products fetched " + JSON.stringify(products));
        },
        error => {
          console.log("PURCHASES products fetched " + JSON.stringify(error));
        }
      );
      Purchases.getPurchaserInfo(info => {
        console.log("PURCHASES getPurchaserInfo " + JSON.stringify(info));
      }, error => {
        console.log("PURCHASES getPurchaserInfo " + JSON.stringify(error));
      });
      Purchases.addAttributionData(
        { data: "yolo" },
        Purchases.ATTRIBUTION_NETWORKS.APPLE_SEARCH_ADS
      );
      Purchases.getEntitlements(
        entitlements => {
          console.log(
            "PURCHASES getEntitlements " + JSON.stringify(entitlements)
          );
        },
        error => {
          console.log("PURCHASES getEntitlements " + JSON.stringify(error));
        }
      );
      Purchases.getAppUserID(appUserID => {
        console.log("PURCHASES appUserID " + appUserID);
      });
      Purchases.createAlias(
        "newAppUserID",
        purchaserInfo => {
          console.log("PURCHASES createAlias " + JSON.stringify(purchaserInfo));
        },
        error => {
          console.log("PURCHASES createAlias " + JSON.stringify(error));
        }
      );
    });
  }

  makePurchase(product: string) {
    Purchases.makePurchase(
      product,
      (info, productIdentifier: string) => {
        console.log(
          "PURCHASES makePurchase " +
            productIdentifier +
            " " +
            JSON.stringify(info)
        );
      },
      error => {
        console.log("PURCHASES makePurchase " + JSON.stringify(error));
      }
    );
  }

  restoreTransactions() {
    Purchases.restoreTransactions(
      info => {
        console.log("PURCHASES restoreTransactions " + JSON.stringify(info));
      },
      error => {
        console.log("PURCHASES restoreTransactions " + JSON.stringify(error));
      }
    );
  }

  reset() {
    Purchases.reset(
      info => {
        console.log("PURCHASES reset " + JSON.stringify(info));
      },
      error => {
        console.log("PURCHASES reset " + JSON.stringify(error));
      }
    );
  }
}
