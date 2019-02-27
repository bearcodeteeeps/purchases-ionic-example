import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Purchases, ATTRIBUTION_NETWORKS } from "@ionic-native/purchases/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    public platform: Platform,
    public purchases: Purchases,
    public statusBar: StatusBar
  ) {
    platform.ready().then(() => {
      this.statusBar.hide();
      this.purchases.setDebugLogsEnabled(true);
      this.purchases.setup(
        "LQmxAoIaaQaHpPiWJJayypBDhIpAZCZN",
        "purchases_sample_id_4"
      );
      this.purchases.setAllowSharingStoreAccount(true);
      this.purchases.onPurchaserInfoUpdated().subscribe(info => {
        console.log(
          "PURCHASES updatedPurchaserInfoReceived " + JSON.stringify(info)
        );
      }, error => {
        console.log("PURCHASES updatedPurchaserInfoReceived " + JSON.stringify(error));
      });

      this.purchases.getPurchaserInfo().subscribe(info => {
        console.log("PURCHASES getPurchaserInfo " + JSON.stringify(info));
      });
      this.purchases.identify("purchases_sample_id_4").subscribe(
        info => {
          console.log("PURCHASES identify " + JSON.stringify(info));
        },
        error => {
          console.log("PURCHASES identify " + JSON.stringify(error));
        }
      );
      this.purchases.getProducts(["onemonth_freetrial"]).subscribe(
        products => {
          console.log("PURCHASES products fetched " + JSON.stringify(products));
        },
        error => {
          console.log("PURCHASES products fetched " + JSON.stringify(error));
        }
      );
      this.purchases.getPurchaserInfo().subscribe(
        info => {
          console.log("PURCHASES getPurchaserInfo " + JSON.stringify(info));
        },
        error => {
          console.log("PURCHASES getPurchaserInfo " + JSON.stringify(error));
        }
      );
      this.purchases.addAttributionData(
        { data: "yolo" },
        ATTRIBUTION_NETWORKS.APPLE_SEARCH_ADS
      );
      this.purchases.getEntitlements().subscribe(
        entitlements => {
          console.log(
            "PURCHASES getEntitlements " + JSON.stringify(entitlements)
          );
        },
        error => {
          console.log("PURCHASES getEntitlements " + JSON.stringify(error));
        }
      );
      this.purchases.getAppUserID().subscribe(appUserID => {
        console.log("PURCHASES appUserID " + appUserID);
      });
      this.purchases.createAlias("newAppUserID").subscribe(
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
    this.purchases.makePurchase(product).subscribe(
      response => {
        console.log(
          "PURCHASES makePurchase " +
            response.productIdentifier +
            " " +
            JSON.stringify(response.purchaserInfo)
        );
      },
      error => {
        console.log("PURCHASES makePurchase " + JSON.stringify(error));
      }
    );
  }

  restoreTransactions() {
    this.purchases.restoreTransactions().subscribe(
      info => {
        console.log("PURCHASES restoreTransactions " + JSON.stringify(info));
      },
      error => {
        console.log("PURCHASES restoreTransactions " + JSON.stringify(error));
      }
    );
  }

  reset() {
    this.purchases.reset().subscribe(
      info => {
        console.log("PURCHASES reset " + JSON.stringify(info));
      },
      error => {
        console.log("PURCHASES reset " + JSON.stringify(error));
      }
    );
  }
}
