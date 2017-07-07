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
        using System;

        namespace Navi
        {
            class EvilTransform
            {
                const double pi = 3.14159265358979324;

                //
                // Krasovsky 1940
                //
                // a = 6378245.0, 1/f = 298.3
                // b = a * (1 - f)
                // ee = (a^2 - b^2) / a^2;
                const double a = 6378245.0;
                const double ee = 0.00669342162296594323;

                //
                // World Geodetic System ==> Mars Geodetic System
                public static void transform(double wgLat, double wgLon, out double mgLat, out double mgLon)
            {
                if (outOfChina(wgLat, wgLon))
            {
                mgLat = wgLat;
                mgLon = wgLon;
                return;
            }
            double dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
            double dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
            double radLat = wgLat / 180.0 * pi;
            double magic = Math.Sin(radLat);
            magic = 1 - ee * magic * magic;
            double sqrtMagic = Math.Sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
            dLon = (dLon * 180.0) / (a / sqrtMagic * Math.Cos(radLat) * pi);
            mgLat = wgLat + dLat;
            mgLon = wgLon + dLon;
        }

            static bool outOfChina(double lat, double lon)
            {
                if (lon < 72.004 || lon > 137.8347)
                    return true;
                if (lat < 0.8293 || lat > 55.8271)
                    return true;
                return false;
            }

            static double transformLat(double x, double y)
            {
                double ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.Sqrt(Math.Abs(x));
                ret += (20.0 * Math.Sin(6.0 * x * pi) + 20.0 * Math.Sin(2.0 * x * pi)) * 2.0 / 3.0;
                ret += (20.0 * Math.Sin(y * pi) + 40.0 * Math.Sin(y / 3.0 * pi)) * 2.0 / 3.0;
                ret += (160.0 * Math.Sin(y / 12.0 * pi) + 320 * Math.Sin(y * pi / 30.0)) * 2.0 / 3.0;
                return ret;
            }

            static double transformLon(double x, double y)
            {
                double ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.Sqrt(Math.Abs(x));
                ret += (20.0 * Math.Sin(6.0 * x * pi) + 20.0 * Math.Sin(2.0 * x * pi)) * 2.0 / 3.0;
                ret += (20.0 * Math.Sin(x * pi) + 40.0 * Math.Sin(x / 3.0 * pi)) * 2.0 / 3.0;
                ret += (150.0 * Math.Sin(x / 12.0 * pi) + 300.0 * Math.Sin(x / 30.0 * pi)) * 2.0 / 3.0;
                return ret;
            }
        }
        }
    }

    GCJ02_BD09(latitude, longitude) {
        let x = longitude, y = latitude;

        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * Math.PI);

        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * Math.PI);

        return {
            latitude : z * Math.sin(theta) + 0.006 ,
            longitude : z * Math.cos(theta) + 0.0065
        }
    }

    BD09_GCJ02(latitude, longitude) {
        let x = longitude - 0.0065, y = latitude - 0.006;

        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);

        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);

        return {
            longitude : z * Math.cos(theta) ,
            latitude : z * Math.sin(theta)
        }
    }

    testLongitude(longitude) {
        return /^\-?(((1[0-7]\d{1})|(\d{1,2}))°([0-5]?\d{1})′([0-5]?\d{1})″)|((180)°(00)′(00)″)$/.test(longitude)
    }

    testLatitude(latitude) {
        return /^\-?(([0-8]?\d{1})°([0-5]?\d{1})′([0-5]?\d{1})″)|((90)°(00)′(00)″)$/.test(latitude)
    }
}