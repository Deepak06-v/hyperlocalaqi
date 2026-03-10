# 🚀 Step-by-Step Startup Guide

Follow these steps in order to get the application running.

---

## **Step 1: Open PowerShell**

Click on Windows Start menu and search for **PowerShell** or **PowerShell ISE**, then click to open it.

Or press: `Win + X` → Select **Windows PowerShell** or **Terminal**

---

## **Step 2: Navigate to Project Directory**

Copy and paste this command into PowerShell:

```powershell
cd "c:\Users\ADMIN\OneDrive\Documents\New project 2"
```

Press **Enter** ↵

---

## **Step 3: Create Virtual Environment (First Time Only)**

Run this command to create a Python virtual environment:

```powershell
python -m venv venv
```

Wait for it to complete (~30 seconds). You'll see a `venv` folder appear in the project directory.

**Note**: If you see this message, skip to Step 4:
```
The system cannot find the path specified.
```

---

## **Step 4: Install Dependencies (First Time Only)**

Run this command to install all required Python packages:

```powershell
.\venv\Scripts\pip.exe install -r backend\requirements.txt
```

⏳ This may take 2-3 minutes. Wait for it to finish (you'll see "Successfully installed..." at the end).

---

## **Step 5: Start the Backend Server**

In the SAME PowerShell window, run:

```powershell
.\venv\Scripts\python.exe -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

✅ **Success indicators** (watch for these messages):
```
Uvicorn running on http://0.0.0.0:8000
Application startup complete
```

⚠️ **Leave this window open!** The backend must stay running.

---

## **Step 6: Open a NEW PowerShell Window**

**Do NOT close the first window!** 

Open a second PowerShell window:
- Click Start menu → Search **PowerShell** → Open new window
- Or press: `Win + Shift + P` to open new terminal

---

## **Step 7: Navigate to Frontend Directory**

In the NEW PowerShell window, run:

```powershell
cd "c:\Users\ADMIN\OneDrive\Documents\New project 2\frontend"
```

Press **Enter** ↵

---

## **Step 8: Start the Frontend Server**

Run this command:

```powershell
python -m http.server 3000
```

✅ **Success indicator** (watch for):
```
Serving HTTP on 0.0.0.0 port 3000
```

⚠️ **Leave this window open too!** The frontend must stay running.

---

## **Step 9: Open Your Browser**

Open your web browser (Chrome, Edge, Firefox, etc.) and go to:

## **http://localhost:3000**

🎉 **You should see the Dashboard!**

---

## **Step 10: Verify Everything Works**

Check that you can:

1. ✅ See the **AQI Map** page with a map
2. ✅ Click on **AQI Forecast** tab
3. ✅ Click on **Pollution Source Map** tab
4. ✅ Click on **Admin Panel** tab

If all pages load, you're good to go! ✅

---

## **Optional: Test API Directly**

Open a third PowerShell and test the API:

```powershell
Invoke-WebRequest -Uri "http://localhost:8000/health" -UseBasicParsing
```

You should see:
```
StatusCode        : 200
Content          : {"status":"ok"}
```

---

## **API Documentation (Optional)**

To see interactive API docs, visit:

## **http://localhost:8000/docs**

This shows all available endpoints and lets you test them.

---

## **How to Stop**

When you want to stop the application:

### **Stop Frontend (Terminal 2)**
- Click on Terminal 2 (frontend window)
- Press: `Ctrl + C`

### **Stop Backend (Terminal 1)**
- Click on Terminal 1 (backend window)  
- Press: `Ctrl + C`

---

## **How to Restart**

Simply repeat **Steps 5-8** (you only need Steps 1-4 once).

Next time you start:
- Step 5: Start backend
- Step 6-8: Start frontend
- Done!

---

## **Troubleshooting**

### **Python not found**
- Make sure Python 3.11+ is installed: `python --version`
- If not installed, download from https://www.python.org/

### **Port 8000 already in use**
- Change port in Step 5: `--port 9000` (use 9000 instead)
- Then access API at: http://localhost:9000

### **Port 3000 already in use**
- Change port in Step 8: `3001` instead of `3000`
- Then visit: http://localhost:3001

### **Dependencies failed to install**
- Delete venv folder: `Remove-Item -Recurse venv`
- Restart from Step 3

### **Backend crashes on startup**
- Check if another process is using port 8000
- Or check `backend/requirements.txt` exists

### **Frontend shows blank page**
- Make sure backend is running (Step 5 should show startup message)
- Refresh browser: `Ctrl + R`

---

## **Summary**

| Step | Command | Window | Wait For |
|------|---------|--------|----------|
| 1-2 | Navigate to folder | Terminal 1 | Prompt |
| 3-4 | Setup dependencies | Terminal 1 | "Successfully installed" |
| 5 | Start backend | Terminal 1 | "Application startup complete" |
| 6-7 | New Windows + navigate | Terminal 2 | Prompt |
| 8 | Start frontend | Terminal 2 | "Serving HTTP on 0.0.0.0 port 3000" |
| 9 | Open browser | Browser | Dashboard loads |
| ✅ | **DONE!** | You can now use the app | — |

---

**Happy coding! 🎉**
