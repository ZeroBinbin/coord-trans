class Coord {
    /**
     *
     * @param latitude
     * @param longitude
     * @param type (WGS84 ,GCJ02 ,BD09) 默认为GCJ02
     */
    constructor(latitude, longitude, type) {
        if (typeof latitude === "string" && this.testLatitude(latitude)) {
            latitude = this.GPS_WGS84(latitude);
            type = 'WGS84';
        }
        if (typeof longitude === "string" && this.testLongitude(longitude)) {
            longitude = this.GPS_WGS84(longitude);
            type = 'WGS84';
        }
        switch (type) {
            case  'WGS84' :
            {
                let gcj02 = {}, bd09 = {};
                this.WGS84 = {
                    latitude,
                    longitude
                };
                gcj02 = this.WGS84_GCJ02(latitude, longitude);
                this.GCJ02 = {
                    ...gcj02
                };
                bd09 = this.GCJ02_BD09(...gcj02);
                this.BD09 = {
                    ...bd09
                }
            }
                ;
                break;
            case 'GCJ02' :
            {
                this.GCJ02 = {
                    latitude,
                    longitude
                }
                this.BD09 = {
                    ...this.GCJ02_BD09(latitude, longitude)
                }
            }
                ;
                break;
            case 'BD09' :
            {
                this.BD09 = {
                    latitude,
                    longitude
                }
                this.GCJ02 = {
                    ...this.BD09_GCJ02(latitude, longitude)
                }
            }
                ;
                break;
            default :
            {
                this.GCJ02 = {
                    latitude,
                    longitude
                }
                this.BD09 = {
                    ...this.GCJ02_BD09(latitude, longitude)
                }
            }
                ;
                break;
        }
    }

    GPS_WGS84(gps) {
        let arr = gps.match(/(\d{1,3})°(\d{1,2})′(\d{1,3})″/);
        let du = arr[1] ,fen = arr[2] ,miao = arr[3];
        return (du + fen / 60 + miao / 3600).toFixed(5);
    }

    WGS84_GCJ02(latitude, longitude) {

    }

    GCJ02_BD09(latitude, longitude) {

    }

    BD09_GCJ02(latitude, longitude) {

    }

    testLongitude(longitude) {
        return /^\-?(((1[0-7]\d{1})|(\d{1,2}))°([0-5]?\d{1})′([0-5]?\d{1})″)|((180)°(00)′(00)″)$/.test(longitude)
    }

    testLatitude(latitude) {
        return /^\-?(([0-8]?\d{1})°([0-5]?\d{1})′([0-5]?\d{1})″)|((90)°(00)′(00)″)$/.test(latitude)
    }
}