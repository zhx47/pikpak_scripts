const crypto = require("crypto");
const {v4: uuidv4} = require('uuid');

const device_lists = {
    timestamp: 1682864287202,
    products: [
        {
            name: "华为/荣耀（旧）",
            value: "HUAWEI",
            models: [
                {name: "HUAWEI Mate X3", value: "ALT-AL00"},
                {name: "HUAWEI Mate X2 典藏版", value: "TET-AN50"},
                {name: "HUAWEI Mate X2", value: "TET-AN00"},
                {name: "HUAWEI Mate X", value: "TAH-AN00"},
                {name: "HUAWEI Mate Xs 2 典藏版", value: "PAL-AL00-DC"},
                {name: "HUAWEI Mate Xs 2", value: "PAL-AL00"},
                {name: "HUAWEI Mate Xs", value: "TAH-AN00m"},
                {name: "HUAWEI Mate 50 RS", value: "DCO-AL00-PD"},
                {name: "HUAWEI Mate 50 Pro", value: "DCO-AL00"},
                {name: "HUAWEI Mate 50", value: "CET-AL00"},
                {name: "HUAWEI Mate 50E", value: "CET-AL60"},
                {name: "HUAWEI Mate 40 RS", value: "NOP-AN00-PD"},
                {name: "HUAWEI Mate 40 Pro+", value: "NOP-AN00"},
                {name: "HUAWEI Mate 40 Pro", value: "NOH-AN00"},
                {name: "HUAWEI Mate 40", value: "OCE-AN10"},
                {name: "HUAWEI Mate 40E", value: "OCE-AN50"},
                {name: "HUAWEI Mate 30 RS", value: "LIO-AN00P"},
                {name: "HUAWEI Mate 30 Pro 5G", value: "LIO-AN00"},
                {name: "HUAWEI Mate 30 5G", value: "TAS-AN00"},
                {name: "HUAWEI Mate 30 Pro", value: "LIO-AL00"},
                {name: "HUAWEI Mate 30", value: "TAS-AL00"},
                {name: "HUAWEI Mate 30E Pro 5G", value: "LIO-AN00m"},
                {name: "HUAWEI P60 Pro", value: "MNA-AL00"},
                {name: "HUAWEI P60", value: "LNA-AL00"},
                {name: "HUAWEI P50 Pocket", value: "BLA-AL80"},
                {name: "HUAWEI P50 Pro", value: "JAD-AL80"},
                {name: "HUAWEI P50", value: "ABR-AL80"},
                {name: "HUAWEI P50E", value: "ABR-AL90"},
                {name: "HUAWEI P40 Pro+", value: "ELS-AN10"},
                {name: "HUAWEI P40 Pro", value: "ELS-AN00"},
                {name: "HUAWEI P40", value: "ANA-AN00"},
                {name: "HUAWEI P40 4G", value: "ANA-AL00"},
                {name: "HUAWEI P30 Pro", value: "VOG-AL10"},
                {name: "HUAWEI P30", value: "ELE-AL00"},
                {name: "HUAWEI Pocket S", value: "BAL-AL60"},
                {name: "HUAWEI nova 11 Ultra", value: "GOA-AL80U"},
                {name: "HUAWEI nova 11 Pro", value: "GOA-AL80"},
                {name: "HUAWEI nova 11", value: "FOA-AL00"},
                {name: "HUAWEI nova 10 Pro", value: "GLA-AL00"},
                {name: "HUAWEI nova 10", value: "NCO-AL00"},
                {name: "HUAWEI nova 10 SE", value: "BNE-AL00"},
                {name: "HUAWEI nova 10z", value: "CHA-AL80"},
                {name: "HUAWEI nova 10青春版", value: "JLN-AL00"},
                {name: "HUAWEI nova 9 Pro", value: "RTE-AL00"},
                {name: "HUAWEI nova 9", value: "NAM-AL00"},
                {name: "HUAWEI nova 9 SE", value: "JLN-AL00"},
                {name: "荣耀30S", value: "CDY-AN90"},
                {name: "荣耀30 Pro+", value: "EBG-AN10"},
                {name: "荣耀30 Pro", value: "EBG-AN00"},
                {name: "荣耀30", value: "BMH-AN10"},
                {name: "荣耀30 青春版", value: "MXW-AN00"},
                {name: "荣耀V30 Pro", value: "OXF-AN10"},
                {name: "荣耀V30", value: "OXF-AN00"}
            ]
        },
        {
            name: "荣耀",
            value: "HONOR",
            models: [
                {name: "荣耀Magic Vs 至臻版", value: "FRI-AN10"},
                {name: "荣耀Magic Vs", value: "FRI-AN00"},
                {name: "荣耀Magic V", value: "MGI-AN00"},
                {name: "荣耀Magic 5 至臻版", value: "PGT-AN20"},
                {name: "荣耀Magic 5 Pro", value: "PGT-AN10"},
                {name: "荣耀Magic 5", value: "PGT-AN00"},
                {name: "荣耀Magic 4 至臻版", value: "LGE-AN20"},
                {name: "荣耀Magic 4 Pro", value: "LGE-AN10"},
                {name: "荣耀Magic 4", value: "LGE-AN00"},
                {name: "荣耀80 GT", value: "AGT-AN00"},
                {name: "荣耀80 Pro", value: "ANP-AN00"},
                {name: "荣耀80 Pro 直屏版", value: "ANB-AN00"},
                {name: "荣耀80", value: "ANN-AN00"},
                {name: "荣耀80 SE", value: "GIA-AN80"},
                {name: "荣耀70 Pro+", value: "HPB-AN00"},
                {name: "荣耀70 Pro", value: "SDY-AN00"},
                {name: "荣耀70", value: "FNE-AN00"},
                {name: "荣耀60 Pro", value: "TNA-AN00"},
                {name: "荣耀60", value: "LSA-AN00"},
                {name: "荣耀X50i", value: "CRT-AN00"},
                {name: "荣耀X40 GT", value: "ADT-AN00"},
                {name: "荣耀40i", value: "DIO-AN00"},
                {name: "荣耀X40", value: "RMO-AN00"}
            ]
        },
        {
            name: "小米/Redmi",
            value: "Xiaomi",
            models: [
                {name: "小米13 Ultra", value: "2304FPN6DC"},
                {name: "小米13 Pro", value: "2210132C"},
                {name: "小米13", value: "2211133C"},
                {name: "小米12S Ultra", value: "2203121C"},
                {name: "小米12S Pro", value: "2206122SC"},
                {name: "小米12S", value: "2206123SC"},
                {name: "小米12 Pro", value: "2201122C"},
                {name: "小米12", value: "2201123C"},
                {name: "小米12X", value: "2112123AC"},
                {name: "小米12 Pro 天玑版", value: "2207122MC"},
                {name: "小米11 Ultra", value: "M2102K1C"},
                {name: "小米11 Pro", value: "M2102K1AC"},
                {name: "小米11", value: "M2011K2C"},
                {name: "小米11 青春版", value: "M2101K9C"},
                {name: "小米11 青春活力版", value: "2107119DC"},
                {name: "小米10 至尊纪念版", value: "M2007J1SC"},
                {name: "小米10 青春版1", value: "M2022J9E"},
                {name: "小米10 青春版2", value: "M2102J2SC"},
                {name: "小米10 Pro", value: "Mi 10 Pro"},
                {name: "小米10", value: "Mi 10"},
                {name: "小米5", value: "MI 5"},
                {name: "小米MIX Fold 2", value: "22061218C"},
                {name: "小米MIX FOLD", value: "M2011J18C"},
                {name: "小米MIX Alpha", value: "MIX Alpha"},
                {name: "小米MIX 4", value: "2106118C"},
                {name: "小米MIX 3 5G", value: "Mi MIX 3 5G"},
                {name: "小米MIX 3 故宫特别版", value: "MIX 3 The Palace Museum Edition"},
                {name: "小米MIX 3", value: "MIX 3"},
                {name: "小米MIX 2S 翡翠艺术版", value: "MIX 2S Emerald Edition"},
                {name: "小米MIX 2S", value: "MIX 2S"},
                {name: "小米MIX 2 艺术特别版", value: "MIX 2 ART"},
                {name: "小米MIX 2", value: "MIX 2"},
                {name: "小米MIX", value: "MIX"},
                {name: "小米Civi 3", value: "23046PNC9C"},
                {name: "小米Civi 2", value: "2209129SC"},
                {name: "小米Civi 1S", value: "2109119BC"},
                {name: "小米Civi", value: "Xiaomi Civi"},
                {name: "Redmi K60 Pro", value: "22127RK46C"},
                {name: "Redmi K60", value: "23013RK75C"},
                {name: "Redmi K60E", value: "22122RK93C"},
                {name: "Redmi K50 电竞版", value: "21121210C"},
                {name: "Redmi K50 至尊版", value: "22081212C"},
                {name: "Redmi K50 Pro", value: "22011211C"},
                {name: "Redmi K50", value: "22041211AC"},
                {name: "Redmi K40S", value: "22021211RC"},
                {name: "Redmi K40 游戏增强版", value: "M2012K10C"},
                {name: "Redmi K40 Pro", value: "M2012K11C"},
                {name: "Redmi K40", value: "M2012K11AC"},
                {name: "Redmi Note 12 Turbo", value: "23049RAD8C"},
                {name: "Redmi Note 12 Pro 极速版", value: "22101320C"},
                {name: "Redmi Note 12 探索版", value: "22101316UC"},
                {name: "Redmi Note 12 Pro+", value: "22101316UCP"},
                {name: "Redmi Note 12 Pro", value: "22101316C"},
                {name: "Redmi Note 12", value: "22101317C"},
                {name: "Redmi Note 11T Pro+", value: "22041216UC"},
                {name: "Redmi Note 11T Pro", value: "22041216C"},
                {name: "Redmi Note 11 Pro+", value: "21091116UC"},
                {name: "Redmi Note 11 Pro", value: "21091116C"},
                {name: "Redmi Note 11 5G", value: "21091116AC"},
                {name: "Redmi Note 11 4G", value: "21121119SC"},
                {name: "Redmi Note 11R", value: "22095RA98C"},
                {name: "Redmi Note 11E Pro", value: "2201116SC"}
            ]
        },
        {
            name: "一加",
            value: "OnePlus",
            models: [
                {name: "OnePlus 11", value: "PHB110"},
                {name: "OnePlus 10 Pro", value: "NE2210"},
                {name: "OnePlus 9R", value: "LE2100"},
                {name: "OnePlus 9RT", value: "MT2110"},
                {name: "OnePlus 9 Pro", value: "LE2120"},
                {name: "OnePlus 9", value: "LE2110"},
                {name: "OnePlus 8T", value: "KB2000"},
                {name: "OnePlus 8 Pro", value: "IN2020"},
                {name: "OnePlus 8", value: "IN2010"},
                {name: "OnePlus 7T Pro", value: "HD1910"},
                {name: "OnePlus 7T", value: "HD1900"},
                {name: "OnePlus 7 Pro", value: "GM1910"},
                {name: "OnePlus 7", value: "GM1900"},
                {name: "OnePlus Ace 2V", value: "PHP110"},
                {name: "OnePlus Ace 2", value: "PHK110"},
                {name: "OnePlus Ace Pro", value: "PGP110"},
                {name: "OnePlus Ace 竞速版", value: "PGZ110"},
                {name: "OnePlus Ace", value: "PGKM10"}
            ]
        },
        {
            name: "OPPO",
            value: "OPPO",
            models: [
                {name: "OPPO Find N2", value: "PGU100"},
                {name: "OPPO Find N2 Flip", value: "PGT100"},
                {name: "OPPO Find N", value: "PEUM00"},
                {name: "OPPO Find X6 Pro", value: "PGEM10"},
                {name: "OPPO Find X6", value: "PGFM10"},
                {name: "OPPO Find X5 Pro", value: "PFEM10"},
                {name: "OPPO Find X5", value: "PFFM10"},
                {name: "OPPO Find X3 Pro MARS", value: "PEEM00_MARS"},
                {name: "OPPO Find X3 Pro", value: "PEEM00"},
                {name: "OPPO Find X3", value: "PEDM00"},
                {name: "OPPO Reno9 Pro+", value: "PGW110"},
                {name: "OPPO Reno9 Pro", value: "PGX110"},
                {name: "OPPO Reno9", value: "PHM110"},
                {name: "OPPO Reno8 Pro+", value: "PFZM10"},
                {name: "OPPO Reno8 Pro", value: "PGAM10"},
                {name: "OPPO Reno8", value: "PGBM10"},
                {name: "OPPO K10x", value: "PGGM10"},
                {name: "OPPO K10 Pro", value: "PGIM10"},
                {name: "OPPO K10", value: "PGJM10"},
                {name: "OPPO K9s", value: "PERM10"},
                {name: "OPPO K9 Pro", value: "PEYM00"},
                {name: "OPPO K9", value: "PEXM00"},
                {name: "OPPO A1 Pro", value: "PHQ110"},
                {name: "OPPO A1", value: "PHS110"},
                {name: "OPPO A97", value: "PFTM10"},
                {name: "OPPO A96", value: "PFUM10"},
                {name: "OPPO A58", value: "PHJ110"},
                {name: "OPPO A57", value: "PFTM20"},
                {name: "OPPO A55s", value: "PEMM00"},
                {name: "OPPO A36", value: "PESM10"}
            ]
        },
        {
            name: "真我",
            value: "realme",
            models: [
                {name: "真我11 Pro+", value: "RMX3740"},
                {name: "真我11 Pro", value: "RMX3770"},
                {name: "真我11", value: "RMX3751"},
                {name: "真我10s", value: "RMX3617"},
                {name: "真我10 Pro+", value: "RMX3687"},
                {name: "真我10 Pro", value: "RMX3663"},
                {name: "真我10", value: "RMX3615"},
                {name: "真我GT2大师探索版", value: "RMX3551"},
                {name: "真我GT2 Pro", value: "RMX3300"},
                {name: "真我GT2", value: "RMX3310"},
                {name: "真我GT 大师版", value: "RMX3361"},
                {name: "真我Q5 Pro", value: "RMX3572"},
                {name: "真我Q5", value: "RMX3478"},
                {name: "真我Q5i", value: "RMX3574"},
                {name: "真我Q3s", value: "RMX3461"},
                {name: "真我Q3t", value: "RMX3462"},
                {name: "真我Q3 Pro 狂欢版", value: "RMX3142"},
                {name: "真我Q3 Pro", value: "RMX2205"},
                {name: "真我Q3", value: "RMX3161"},
                {name: "真我Q3i", value: "RMX3042"},
                {name: "真我GT Neo5", value: "RMX3708"},
                {name: "真我GT Neo5 SE", value: "RMX3700"},
                {name: "真我GT Neo3", value: "RMX3562"},
                {name: "真我GT Neo 闪速版", value: "RMX3350"},
                {name: "真我GT Neo2T", value: "RMX3357"},
                {name: "真我GT Neo", value: "RMX3031"},
                {name: "真我V30t", value: "RMX3618"},
                {name: "真我X7 Pro 至尊版", value: "RMX3115"},
                {name: "真我X7 Pro", value: "RMX2121"},
                {name: "真我X7", value: "RMX2176"},
                {name: "真我X50 Pro 玩家版", value: "RMX2072"},
                {name: "真我X50 Pro", value: "RMX2071"},
                {name: "真我X50m", value: "RMX2142"},
                {name: "真我X50", value: "RMX2051"}
            ]
        },
        {
            name: "vivo/iQOO",
            value: "vivo",
            models: [
                {name: "vivo X Fold2", value: "V2266A"},
                {name: "vivo X Flip", value: "V2256A"},
                {name: "vivo X Fold+", value: "V2229A"},
                {name: "vivo X Fold", value: "V2178A"},
                {name: "vivo X Note", value: "V2170A"},
                {name: "vivo X90 Pro+", value: "V2227A"},
                {name: "vivo X90 Pro", value: "V2242A"},
                {name: "vivo X90", value: "V2241A"},
                {name: "vivo X80 Pro 天玑9000", value: "V2186A"},
                {name: "vivo X80 Pro", value: "V2185A"},
                {name: "vivo X80", value: "V2183A"},
                {name: "vivo S16 Pro", value: "V2245A"},
                {name: "vivo S16", value: "V2244A"},
                {name: "vivo S16e", value: "V2239A"},
                {name: "vivo S15 Pro", value: "V2207A"},
                {name: "vivo S15", value: "V2203A"},
                {name: "vivo S15e", value: "V2190A"},
                {name: "vivo Y78+", value: "V2271A"},
                {name: "vivo Y77", value: "V2219A"},
                {name: "vivo Y73t", value: "V2164PA"},
                {name: "vivo Y55s", value: "V2164A"},
                {name: "vivo Y32", value: "V2158A"},
                {name: "iQOO 11 Pro", value: "V2254A"},
                {name: "iQOO 11", value: "V2243A"},
                {name: "iQOO 10 Pro", value: "V2218A"},
                {name: "iQOO 10", value: "V2217A"},
                {name: "iQOO 9 Pro", value: "V2172A"},
                {name: "iQOO 9", value: "V2171A"},
                {name: "iQOO 8", value: "V2136A"},
                {name: "iQOO 7", value: "V2049A"},
                {name: "iQOO Neo7 SE", value: "V2038A"},
                {name: "iQOO Neo7 竞速版", value: "V2232A"},
                {name: "iQOO Neo7", value: "V2231A"},
                {name: "iQOO Neo6 SE", value: "V2199A"},
                {name: "iQOO Neo6", value: "V2196A"},
                {name: "iQOO Z7x", value: "V2272A"},
                {name: "iQOO Z7i", value: "V2230EA"},
                {name: "iQOO Z7", value: "V2270A"},
                {name: "iQOO Z6x", value: "V2164KA"},
                {name: "iQOO Z6", value: "V2220A"},
                {name: "iQOO U5x", value: "V2180GA"},
                {name: "iQOO U5", value: "V2165A"},
                {name: "iQOO U3", value: "V2061A"},
                {name: "iQOO U1x", value: "V2065A"},
                {name: "iQOO U1", value: "V2023A"}
            ]
        },
        {
            name: "魅族",
            value: "meizu",
            models: [
                {name: "魅族20 无界版", value: "MEIZU 20 Inf"},
                {name: "魅族20 Pro", value: "MEIZU 20 Pro"},
                {name: "魅族20", value: "MEIZU 20"},
                {name: "魅族18s Pro", value: "MEIZU 18s Pro"},
                {name: "魅族18s", value: "MEIZU 18s"},
                {name: "魅族18X", value: "MEIZU 18X"},
                {name: "魅族18 Pro", value: "MEIZU 18 Pro"},
                {name: "魅族18", value: "MEIZU 18"},
                {name: "魅族17 Pro", value: "meizu 17 Pro"},
                {name: "魅族17", value: "meizu 17"}
            ]
        },
        {
            name: "三星",
            value: "Samsung",
            models: [
                {name: "Galaxy S23 Ultra", value: "SM-S9180"},
                {name: "Galaxy S23+", value: "SM-S9160"},
                {name: "Galaxy S23", value: "SM-S9110"},
                {name: "Galaxy S22 Ultra", value: "SM-S9080"},
                {name: "Galaxy S22+", value: "SM-S9060"},
                {name: "Galaxy S22", value: "SM-S9010"},
                {name: "Galaxy S21 Ultra", value: "SM-G9980"},
                {name: "Galaxy S21+", value: "SM-G9960"},
                {name: "Galaxy S21", value: "SM-G9910"},
                {name: "Galaxy S21 FE", value: "SM-G9900"},
                {name: "Galaxy Note20 Ultra", value: "SM-N9860"},
                {name: "Galaxy Note20", value: "SM-N9810"},
                {name: "Galaxy Note10+", value: "SM-N9760"},
                {name: "Galaxy Note10", value: "SM-N9700"},
                {name: "Galaxy Z Fold4", value: "SM-F9360"},
                {name: "Galaxy Z Fold3", value: "SM-F9260"},
                {name: "Galaxy Z Fold2", value: "SM-F9160"},
                {name: "Galaxy Fold", value: "SM-F9000"},
                {name: "Galaxy Z Flip4", value: "SM-F7210"},
                {name: "Galaxy Z Flip3", value: "SM-F7110"},
                {name: "Galaxy Z Flip 5G", value: "SM-F7070"},
                {name: "Galaxy Z Flip", value: "SM-F7000"},
                {name: "W23", value: "SM-W9023"},
                {name: "W23 Flip", value: "SM-W7023"},
                {name: "W22", value: "SM-W2022"},
                {name: "W20", value: "SM-W2020"},
                {name: "W21", value: "SM-W2021"}
            ]
        },
        {
            name: "华硕/ROG",
            value: "asus",
            models: [
                {name: "ROG 7 Pro", value: "ASUS_AI2205_B"},
                {name: "ROG 7", value: "ASUS_AI2205_A"},
                {name: "ROG 6 天玑至尊版", value: "ASUS_AI2203_B"},
                {name: "ROG 6 天玑版", value: "ASUS_AI2203_A"},
                {name: "ROG 6 Pro", value: "ASUS_AI2201_B"},
                {name: "ROG 6", value: "ASUS_AI2201_A"},
                {name: "ROG 5 幻影", value: "ASUS_I005DB"},
                {name: "ROG 5", value: "ASUS_I005DA"},
                {name: "ROG 3", value: "ASUS_I003DD"},
                {name: "ROG 2", value: "ASUS_I001DA"},
                {name: "ROG", value: "ASUS_Z01QD"},
                {name: "Smartphone for Snapdragon Insiders", value: "ASUS_I007D"}
            ]
        },
        {
            name: "索尼",
            value: "Sony",
            models: [
                {name: "Xperia Pro-I", value: "XQ-BE72"},
                {name: "Xperia 1", value: "J9110"},
                {name: "Xperia 1 Ⅱ", value: "XQ-AT72"},
                {name: "Xperia 1 Ⅲ", value: "XQ-BC72"},
                {name: "Xperia 1 Ⅳ", value: "XQ-CT72"},
                {name: "Xperia 5", value: "J9210"},
                {name: "Xperia 5 Ⅱ", value: "XQ-AS72"},
                {name: "Xperia 5 Ⅲ", value: "XQ-BQ72"},
                {name: "Xperia 5 Ⅳ", value: "XQ-CQ72"},
                {name: "Xperia 10 Plus", value: "I4293"}
            ]
        },
        {
            name: "联想/拯救者",
            value: "Lenovo",
            models: [
                {name: "拯救者Y90", value: "Lenovo L71061"},
                {name: "拯救者Y70", value: "Lenovo L71091"},
                {name: "拯救者2 Pro", value: "Lenovo L70081"},
                {name: "拯救者Pro", value: "Lenovo L79031"},
                {name: "Lenovo Z6 Pro 5G", value: "Lenovo L79041"},
                {name: "Lenovo Z6 Pro", value: "Lenovo L78051"},
                {name: "Lenovo Z6", value: "Lenovo L78121"},
                {name: "Lenovo Z6 青春版", value: "Lenovo L38111"},
                {name: "Lenovo Z5 Pro GT", value: "Lenovo L78032"},
                {name: "Lenovo Z5 Pro", value: "Lenovo L78031"},
                {name: "Lenovo Z5s", value: "Lenovo L78071"},
                {name: "Lenovo Z5", value: "Lenovo L78011"}
            ]
        },
        {
            name: "黑鲨",
            value: "blackshark",
            models: [
                {name: "黑鲨5 Pro 中国航天版", value: "SHARK KTUS-A1"},
                {name: "黑鲨5 中国航天版", value: "SHARK PAR-A1"},
                {name: "黑鲨5 Pro", value: "SHARK KTUS-A0"},
                {name: "黑鲨5", value: "SHARK PAR-A0"},
                {name: "黑鲨5 RS", value: "SHARK KSR-A2"},
                {name: "黑鲨4S 高达版", value: "SHARK PRS-A2"},
                {name: "黑鲨4S", value: "SHARK PRS-A1"},
                {name: "黑鲨4 Pro", value: "SHARK KSR-A0"},
                {name: "黑鲨4", value: "SHARK PRS-A0"},
                {name: "黑鲨3S", value: "SHARK KLE-A1"},
                {name: "黑鲨3 Pro", value: "SHARK MBU-A0"},
                {name: "黑鲨3", value: "SHARK KLE-A0"},
                {name: "黑鲨2 Pro", value: "DLT-A0"},
                {name: "黑鲨2", value: "SKW-A0"},
                {name: "黑鲨Helo", value: "AWM-A0"},
                {name: "黑鲨游戏手机", value: "SKR-A0"}
            ]
        },
        {
            name: "努比亚/红魔",
            value: "nubia",
            models: [
                {name: "红魔7S Pro 氘锋透明版", value: "NX709S-TMB"},
                {name: "红魔7S Pro", value: "NX709S"},
                {name: "红魔7S 氘锋透明版", value: "NX679S-TMB"},
                {name: "红魔7S", value: "NX679S"},
                {name: "红魔7 Pro 透明版", value: "NX709J-TMB"},
                {name: "红魔7 Pro", value: "NX709J"},
                {name: "红魔7 氘锋透明版", value: "NX679J-TMB"},
                {name: "红魔7", value: "NX679J"},
                {name: "红魔6S Pro", value: "NX669S"},
                {name: "红魔6R", value: "NX669J-TMB"},
                {name: "红魔6 Pro", value: "NX669J-P"},
                {name: "红魔6", value: "NX679J"},
                {name: "努比亚Z50 Ultra", value: "NX712J"},
                {name: "努比亚Z50", value: "NX711J"},
                {name: "努比亚Z40S Pro", value: "NX702J"},
                {name: "努比亚Z40 Pro", value: "NX701J"},
                {name: "努比亚Z30 Pro", value: "NX667J"},
                {name: "红魔8 Pro+氘锋透明版", value: "NX729J_V1ATMB"},
                {name: "红魔8 Pro+", value: "NX729J_V1A"},
                {name: "红魔8 Pro氘锋透明版", value: "NX729J_V2ATMB"},
                {name: "红魔8 Pro", value: "NX729J_V2A"},
                {name: "红魔6R", value: "NX666J"},
                {name: "红魔6 Pro氘锋透明版", value: "NX669J-TMB"}
            ]
        },
        {
            name: "中兴",
            value: "ZTE",
            models: [
                {name: "Axon 40 Ultra", value: "ZTE A2023P"},
                {name: "Axon 40 Pro", value: "ZTE A2023"},
                {name: "Axon 30 Ultra", value: "ZTE A2022P"},
                {name: "Axon 30 Pro", value: "ZTE A2022"},
                {name: "中兴S30", value: "ZTE 9030N"}
            ]
        },
        {
            name: "摩托罗拉",
            value: "motorola",
            models: [
                {name: "moto raza 2022", value: "XT2251-1"},
                {name: "moto raza 5G", value: "XT2071-4"},
                {name: "moto X40", value: "XT2301-5"},
                {name: "moto X30 Pro", value: "XT2241-1"},
                {name: "moto X30 屏下摄像版", value: "XT2201-6"},
                {name: "moto edge X30", value: "XT2201-2"},
                {name: "moto edge S30 Pro", value: "XT2243-2"},
                {name: "moto edge S30", value: "XT2175-2"},
                {name: "moto edge s pro", value: "XT2153-1"},
                {name: "moto edge s", value: "XT2125-4"},
                {name: "moto edge轻奢版", value: "XT2143-1"},
                {name: "moto g53", value: "XT2335-3"},
                {name: "moto g71s", value: "XT2225-2"}
            ]
        }
    ]
}

function checkFormat(matrix) {
    // 检查每一行，确保逗号后面的数字相同
    for (let i = 0; i < 3; i++) {
        if (!(matrix[i][0].split(',')[1] === matrix[i][1].split(',')[1] &&
            matrix[i][1].split(',')[1] === matrix[i][2].split(',')[1])) {
            return false;
        }
    }

    // 检查每一列，确保逗号前面的数字相同
    for (let i = 0; i < 3; i++) {
        if (!(matrix[0][i].split(',')[0] === matrix[1][i].split(',')[0] &&
            matrix[1][i].split(',')[0] === matrix[2][i].split(',')[0])) {
            return false;
        }
    }

    return true; // 如果所有条件都满足，则返回true
}

function findMatchingMatrix(matrix) {
    if (checkFormat(matrix)) {
        return matrix;
    }
    return null;
}

function tools(e, t, n) {
    return {
        ca: r(e, t),
        f: c(n, t)
    }
}

function r(e, t) {
    let n, r, u, c, f, l, d, p, h, g, y, m, v, w, b, x;
    n = t - 1,
    n < 0 && (n = 0),
        r = e[n],
        u = Math.floor(r.row / 2) + 1,
        c = Math.floor(r.column / 2) + 1,
        f = r.matrix[u][c],
        l = t + 1,
    l >= e.length && (l = t),
        d = e[l],
        p = l % d.row,
        h = l % d.column,
        g = d.matrix[p][h],
        y = e[t],
        m = 3 % y.row,
        v = 7 % y.column,
        w = y.matrix[m][v],
        b = i(f) + o(w),
        x = i(w) - o(f);
    return [s(a(i(f), o(f))), s(a(i(g), o(g))), s(a(i(w), o(w))), s(a(b, x))]
}

function i(e) {
    return +e.split(",")[0]
}

function o(e) {
    return +e.split(",")[1]
}

function a(e, t) {
    return e + "^⁣^" + t
}

function s(e) {
    let t = 0
    for (let r = 0; r < e.length; r++) {
        t = u(31 * t + e.charCodeAt(r));
    }
    return t
}

function u(e) {
    const t = -2147483648
        , n = 2147483647;
    if (e > n) {
        return t + (e - n) % (n - t + 1) - 1
    }
    if (e < t) {
        return n - (t - e) % (n - t + 1) + 1
    }
    return e
}

function c(e, t) {
    return s(e + "⁣" + t)
}

function genSign(data, deviceid) {
    for (let j = 0; j < data.frames.length; j++) {
        const matrix = findMatchingMatrix(data.frames[j].matrix)
        if (matrix) {
            console.log(`找到目标步数：${j}`)
            const {ca, f} = tools(data.frames, j, data.pid);
            return {
                pid: data.pid,
                deviceid: deviceid,
                traceid: data.traceid,
                f: f,
                n: ca[0],
                p: ca[1],
                a: ca[2],
                c: ca[3]
            }
        }
    }
    throw new Error('未找到正确的位置')
}

function getCaptchaSign(package_name, client_id, client_version, deviceid, timestamp) {
    const e = [
        {alg: "md5", salt: "Nw9cvH5q2DqkDTJG73"},
        {alg: "md5", salt: "o+N/zglOE4td/6kmjQldcaT"},
        {alg: "md5", salt: "SynqV"},
        {alg: "md5", salt: "rObDr4xQLmbbk3K7YLn7nsNOlLmTS9h/zQNw+OjNNC"},
        {alg: "md5", salt: "SD+x7W8CNeCIepTTUeENi0cPTRkQlYZuXeMHiu8KdMWs0R"},
        {alg: "md5", salt: "d5bw"},
        {alg: "md5", salt: "qS2pNvzAm3nkoIhK16fKVYp2yHLGwS4M"},
        {alg: "md5", salt: "WKMmTWHMFLMhZxb2Nh"},
        {alg: "md5", salt: "z7aRh"},
        {alg: "md5", salt: "Y5qN0kxE3O"},
        {alg: "md5", salt: "rpJq4"},
        {alg: "md5", salt: "Lfdm3aGbd"},
        {alg: "md5", salt: "X6dfcJrGemgMFLKN85ZcIl0arX3h"},
        {alg: "md5", salt: "u2b"}
    ];
    let hash = `${client_id}${client_version}${package_name}${deviceid}${timestamp}`;
    e.forEach(item => {
        hash += item.salt;
        hash = crypto.createHash('md5').update(hash).digest('hex');
    });

    return `1.${hash}`;
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}

function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') {
        return "NONE";
    }

    let result = "";
    let isFirstLetter = true;

    for (const char of str) {
        if (isFirstLetter && /[a-zA-Z]/.test(char)) {
            result += char.toUpperCase();
            isFirstLetter = false;
        } else {
            if (char === ' ') {
                isFirstLetter = true;
            }
            result += char.toLowerCase();
        }
    }

    return result;
}

function processIdentifier(identifier) {
    const specialCharacter = " ";
    return identifier.replace(/　/g, specialCharacter);
}

function getUserAgent(package_name, client_version, client_id, deviceid) {
    const product_index = getRandomNumber(device_lists.products.length);
    const model_index = getRandomNumber(device_lists.products[product_index].models.length);

    const manufacturer = device_lists.products[product_index].value.toLowerCase();
    const model = device_lists.products[product_index].models[model_index].value.toLowerCase();

    let devicename = ''

    if (!model.toLowerCase().startsWith(manufacturer.toLowerCase())) {
        const manufacturerPart = capitalizeFirstLetter(manufacturer);
        if (manufacturerPart) {
            devicename = processIdentifier(manufacturerPart + "_" + capitalizeFirstLetter(model));
        }
    } else {
        devicename = processIdentifier(capitalizeFirstLetter(model));
    }

    const devicemodel = processIdentifier(model);
    const timestamp = Date.now();

    return {
        phoneModel: model,
        build_manufacturer: manufacturer,
        appUserAgent: `ANDROID-${package_name}/${client_version} protocolversion/200 accesstype/ clientid/${client_id} clientversion/${client_version} action_type/ networktype/WIFI sessionid/ deviceid/${deviceid} providername/NONE devicesign/div101.${deviceid}430c9b9e393eb807dfc0c79466841630 refresh_token/ sdkversion/2.0.1.200201 datetime/${timestamp} usrno/ appname/android-${package_name} session_origin/ grant_type/ appid/ clientip/ devicename/${devicename} osversion/13 platformversion/10 accessmode/ devicemodel/${devicemodel}`,
        webUserAgent: `Mozilla/5.0 (Linux; Android 13; ${model} Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.119 Mobile Safari/537.36`
    }
}

function generateDeviceId() {
    return uuidv4().replace(/-/g, '');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    genSign,
    getCaptchaSign,
    getUserAgent,
    generateDeviceId,
    sleep
}