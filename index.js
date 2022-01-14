document.getElementById("data").addEventListener("click", loaData);
let data = {},
    error = document.getElementById('error'),
    table = document.querySelector('table tbody');

function loaData() {
    const input = document.querySelector('input[type="text"]').value;
    const http = new XMLHttpRequest();
    http.open(
        "GET",
        "http://api.weatherapi.com/v1/current.json?key=402bc9b7fe7448c6b60101433221201&q=" + input + "&aqi=yes&fbclid=IwAR1Rg_46d-rkI6q-6L5FQv9_Nb8Ol_a262ML_vSjZwj9k_FDcLW37QXZ3C4",
        true
    );

    http.onreadystatechange = function () {

        // اخفاء الخطأ ادا كان ظاهر
        error.classList.add('d-none');

        if (input != "") {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                console.log(data);
                document.getElementById("city").innerHTML = data.location.name;
                document.getElementById("country").innerHTML = data.location.region != '' ? data.location.region : 'Unknown';
                document.getElementById("temperature").innerHTML = data.current.temp_c  + "°";
                document.getElementById("code").innerHTML = data.location.country;
                document.getElementById("description").innerHTML = data.current.last_updated;                              
                document.getElementById("image").innerHTML = "<img src='" + data.current.condition.icon.replace("//", "https://") +"'>";
                document.getElementById("tz").innerHTML = data.location.tz_id;
            } else if(this.status == 400) {

                // اظهار الخطأ
                error.innerHTML = "city not found 400!";
                error.classList.remove('d-none');
            }
        } else {

            // اظهار الخطأ
            error.innerHTML = "enter your city";
         
            error.classList.remove('d-none');
        }
    };

    http.send();
}