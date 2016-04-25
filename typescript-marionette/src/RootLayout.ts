namespace TodoMVC {
    "use strict";

    export class RootLayout extends Marionette.LayoutView<any> {
        constructor() {
            super({
                el: "#todoapp",
                regions: {
                    footer: "#footer",
                    header: "#header",
                    main: "#main"
                }
            });

            // TODO: Use classes instead of IDs.
            // this.el = "#todoapp";

            // this.regions = <any>{
            //     footer: "#footer",
            //     header: "#header",
            //     main: "#main"
            // };
        }
    }
}
