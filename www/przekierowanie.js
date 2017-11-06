document.addEventListener('deviceready', onDeviceReady, false);

            function onDeviceReady() {

                

                if (!window.device) {
                    window.device = { platform: 'Browser' };
                }

                handleExternalURLs();
            }

            function handleExternalURLs() {
                alert(device.platform.toUpperCase() + " platforma");//do Usuniecia


                if (device.platform.toUpperCase() === 'ANDROID') {
                    alert("Andrek");//usuń
                    $(document).on('click', 'a[href^="https://www.google.com"]', function (e) {
                        var url = $(this).attr('https://www.google.com');
                        navigator.app.loadUrl(url, { openExternal: true });
                        e.preventDefault();
                    });
                }
                else if (device.platform.toUpperCase() === 'IOS') {
                    alert("Ios");//usuń
                    $(document).on('click', 'a[href^="https://www.google.com"]', function (e) {
                        var url = $(this).attr('https://www.google.com');
                        window.open(url, '_system');
                        e.preventDefault();
                    });
                }
                else {
                    alert("reszta");//usuń
                    window.open("https://www.google.com", "_system");

                }
            }