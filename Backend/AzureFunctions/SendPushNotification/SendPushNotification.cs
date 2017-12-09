using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.NotificationHubs;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace PushNotification
{
    public static class SendPushNotification
    {
        [FunctionName("SendPushNotification")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            log.Info("Push notification function started");

            var hub = NotificationHubClient
                .CreateClientFromConnectionString(@"Endpoint=sb://silvertimetable.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=AgfE/kbvUpEvCA+H/0nUdZGCxto8fcrmKns6npZWOFg=", "SilverTimetableNotificationHub");

            var logs = "";

            // Android
            try
            {
                var result =
                    await hub.SendGcmNativeNotificationAsync("{ \"data\":{ \"message\":\"Udostêpniono nowy plan!\"} }");

                log.Info("android: " + result.State);
                logs += "android: " + result.State + "\n";
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, null, "Push.SendAsync Error");
                logs += ex.Message + "\n";
            }

            // iOS
            try
            {
                var result = await hub.SendAppleNativeNotificationAsync(
                    "{ \"aps\":{ \"alert\":\"Udostêpniono nowy plan!\"} }");

                log.Info("iOS: " + result.State);
                logs += "iOS: " + result.State + "\n";
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, null, "Push.SendAsync Error");
                logs += ex.Message + "\n";
            }

            // Windows
            try
            {
                var result = await hub.SendWindowsNativeNotificationAsync("<toast><visual><binding template=\"ToastText01\"><text id=\"1\">Udostêpniono nowy plan!</text></binding></visual></toast>");

                log.Info("Windows: " + result.State);
                logs += "Windows: " + result.State + "\n";
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, null, "Push.SendAsync Error");
                logs += ex.Message + "\n";
            }

            var response = new HttpResponseMessage
            {
                Content = new StringContent(logs),
                StatusCode = HttpStatusCode.Accepted
            };
            return response;
        }
    }
}
