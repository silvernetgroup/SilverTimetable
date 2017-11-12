using System;
using System.Globalization;
using System.IO;
using System.Net;

namespace UpdateChecker
{
    public class Checker
    {
        public static void DownloadFile(string url)
        {
            WebClient client = new WebClient();
            client.DownloadFile(new Uri(url), "test.txt");
        }

        public static void CheckIfUpdated()
        {
            DateTime lastUpdate;
            DateTime lastCheck;

            DownloadFile("https://gist.githubusercontent.com/WiktorElAttar/44c89d59a2522dfd310bb83e57c36239/raw/50389cc15fcd179a8a9f264068e8388ad23a7bbe/test.txt");

            StreamReader sr = new StreamReader("test.txt");
            lastUpdate = DateTime.Parse(sr.ReadLine());
            sr = new StreamReader("lastTest.txt");
            lastCheck = DateTime.Parse(sr.ReadLine());
            sr.Close();

            if (lastUpdate != lastCheck)
            {
                //sent push notification
                StreamWriter sw = new StreamWriter("lastTest.txt");
                sw.WriteLine(lastUpdate);
                sw.Close();

                Console.WriteLine("zmiana wykryta!");
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Checker.CheckIfUpdated();
        }
    }
}
