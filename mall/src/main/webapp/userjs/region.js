var province;
var city;
var district;
var town;
var value;
var arr;
var region_cb;
function AddressInit(province_s, city_s, district_s, town_s, value_s, cb) {
    region_cb = cb;
    province = province_s;
    city = city_s;
    district = district_s;
    town = town_s;
    value = value_s;
    arr = value ? value.split('_') : [];
    M.jsonp("addr.html?action=region", function (pjson) {
        if (region_cb) {
            region_cb('p', pjson);
        }
        for (var i = 0; i < pjson.length; i++) {
            province.options.add(new Option(pjson[i].name, pjson[i].id));
        }
        province.addEventListener("change", function () {
            City();
        }, false)

        if (arr.length > 0 && arr[0] != "" && arr[0] != "-1") {
            province.value = arr[0];

            City();
        }
    });
}

function AddressByNameInit(province_s, province_v, city_s, city_v, district_s, district_v, town_s, town_v) {
    
    M.jsonp("addr.html?action=value2key&level=0&value=" + province_v + "_" + city_v + "_" + district_v, function (data) {
    
        AddressInit(province_s, city_s, district_s, town_s, data.all);
    })
}


function City() {
    city.options.length = 1;
    district.options.length = 1;
    town.options.length = 1;

    M.jsonp("addr.html?action=region&level=1&value=" + province.value, function (cjson) {
        if (region_cb) {
            region_cb('c', cjson);
        }
        for (var i = 0; i < cjson.length; i++) {
            city.options.add(new Option(cjson[i].name, cjson[i].id));
        }
        city.addEventListener("change", function () {
            District();
        }, false)
        if (arr.length > 1 && arr[1] != "" && arr[1] != "-1") {
            city.value = arr[1];
            District();
        }
    });
}

function District() {
    district.options.length = 1;
    town.options.length = 1;
    M.jsonp("addr.html?action=region&level=2&value=" + city.value, function (djson) {
        if (region_cb) {
            region_cb('d', djson);
        }
        for (var i = 0; i < djson.length; i++) {
            district.options.add(new Option(djson[i].name, djson[i].id));
        }
        district.addEventListener("change", function () {
            Town();
        }, false)
        if (arr.length > 2 && arr[2] != "" && arr[2] != "-1") {
            district.value = arr[2];
            Town();
        }
    });
}

function Town() {
    town.options.length = 1;
    M.jsonp("addr.html?action=region&level=3&value=" + district.value, function (tjson) {
        if (region_cb) {
            region_cb('t', tjson);
        }
        for (var i = 0; i < tjson.length; i++) {
            town.options.add(new Option(tjson[i].name, tjson[i].id));
        }
        if (arr.length > 3 && arr[3] != "" && arr[3] != "-1") {
            town.value = arr[3];
        }
    });
}

function region_serarch(key, cb) {
    if (key == "") {
        alert("请输入要搜索的地址");
        return;
    }
    M.jsonp("addr.html?action=region_serarch&level=3&value=" + key, function (tjson) {
        cb(tjson);
    });
}