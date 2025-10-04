import tkinter as tk
from tkinter import messagebox
import re

# Suspicious keywords often used in phishing URLs
SUSPICIOUS_KEYWORDS = ["login", "verify", "update", "secure", "account", "banking"]

# Known trusted domains (for demo purposes)
TRUSTED_DOMAINS = ["paypal.com", "google.com", "microsoft.com", "bankofamerica.com","https://canvas.fau.edu/"]

def check_url():
    url = entry.get().strip()
    warnings = []

    # 1. Check for IP address instead of domain
    if re.match(r"^https?:\/\/\d+\.\d+\.\d+\.\d+", url):
        warnings.append("⚠️ Uses IP address instead of domain (suspicious).")

    # 2. Check for too many subdomains (e.g., paypal.com.evil.com)
    if url.count(".") > 3:
        warnings.append("⚠️ Too many dots in domain (possible fake).")

    # 3. Check for suspicious keywords in URL
    for word in SUSPICIOUS_KEYWORDS:
        if word in url.lower():
            warnings.append(f"⚠️ Contains suspicious keyword: '{word}'")

    # 4. Check if domain is trusted
    if not any(domain in url for domain in TRUSTED_DOMAINS):
        warnings.append("⚠️ Domain not in trusted list.")

    # Show result in popup
    if warnings:
        messagebox.showwarning("Suspicious URL", 
                               f"The URL '{url}' looks suspicious:\n\n" + "\n".join(warnings))
    else:
        messagebox.showinfo("Safe URL", f"The URL '{url}' looks safe ✅")

def clear_url():
    entry.delete(0, tk.END)

# --- GUI Setup ---
root = tk.Tk()
root.title("Phishing URL Checker (Educational Demo)")
root.geometry("500x250")

label = tk.Label(root, text="Enter a URL to check:", font=("Arial", 12))
label.pack(pady=10)

entry = tk.Entry(root, width=50, font=("Arial", 12))
entry.pack(pady=5)

# Buttons Frame
button_frame = tk.Frame(root)
button_frame.pack(pady=20)

check_button = tk.Button(button_frame, text="Check URL", command=check_url, font=("Arial", 12), bg="lightblue")
check_button.grid(row=0, column=0, padx=10)

clear_button = tk.Button(button_frame, text="Clear", command=clear_url, font=("Arial", 12), bg="lightcoral")
clear_button.grid(row=0, column=1, padx=10)

root.mainloop()
