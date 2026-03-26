/*
 * ESP32 Health Monitoring Client
 * Sends Heart Rate, SpO2, and Location data to Next.js API
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// --- CONFIGURATION ---
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Replace with your Laptop's IP address (e.g., http://192.168.1.10:3000/api/vitals)
// Or your deployed URL
const char* serverUrl = "http://YOUR_LOCAL_IP:3000/api/vitals";

// --- SENSOR MOCKS (Replace with actual sensor readings) ---
float getHeartRate() { return 70.0 + random(0, 30); }
float getSpO2() { return 95.0 + random(0, 5); }
double getLat() { return 13.0827; } // Example: Chennai, India
double getLng() { return 80.2707; }

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Create JSON document
    StaticJsonDocument<200> doc;
    doc["heartRate"] = getHeartRate();
    doc["spO2"] = getSpO2();
    doc["lat"] = getLat();
    doc["lng"] = getLng();

    String requestBody;
    serializeJson(doc, requestBody);

    Serial.print("Sending vitals: ");
    Serial.println(requestBody);

    int httpResponseCode = http.POST(requestBody);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  }

  // Send data every 2 seconds to match dashboard polling
  delay(2000);
}
