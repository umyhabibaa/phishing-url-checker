// Configuration - same as Python version
const SUSPICIOUS_KEYWORDS = [
  "login",
  "verify",
  "update",
  "secure",
  "account",
  "banking",
];
const TRUSTED_DOMAINS = [
  "paypal.com",
  "google.com",
  "microsoft.com",
  "bankofamerica.com",
  "canvas.fau.edu",
];

// DOM elements
const urlInput = document.getElementById("urlInput");
const checkBtn = document.getElementById("checkBtn");
const clearBtn = document.getElementById("clearBtn");
const resultSection = document.getElementById("result");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultContent = document.getElementById("resultContent");

// Initialize event listeners
document.addEventListener("DOMContentLoaded", function () {
  checkBtn.addEventListener("click", checkUrl);
  clearBtn.addEventListener("click", clearUrl);
  urlInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkUrl();
    }
  });

  // Auto-focus on input
  urlInput.focus();
});

function checkUrl() {
  const url = urlInput.value.trim();

  if (!url) {
    showError("Please enter a URL to check.");
    return;
  }

  // Validate URL format
  try {
    new URL(url);
  } catch (e) {
    showError("Please enter a valid URL (e.g., https://example.com)");
    return;
  }

  // Disable button during check
  checkBtn.disabled = true;
  checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';

  // Simulate processing time for better UX
  setTimeout(() => {
    const warnings = analyzeUrl(url);
    displayResult(url, warnings);

    // Re-enable button
    checkBtn.disabled = false;
    checkBtn.innerHTML = '<i class="fas fa-search"></i> Check URL';
  }, 500);
}

function analyzeUrl(url) {
  const warnings = [];
  const lowerUrl = url.toLowerCase();

  // 1. Check for IP address instead of domain
  const ipPattern = /^https?:\/\/\d+\.\d+\.\d+\.\d+/;
  if (ipPattern.test(url)) {
    warnings.push("⚠️ Uses IP address instead of domain (suspicious)");
  }

  // 2. Check for too many subdomains (e.g., paypal.com.evil.com)
  const dotCount = (url.match(/\./g) || []).length;
  if (dotCount > 3) {
    warnings.push("⚠️ Too many dots in domain (possible fake)");
  }

  // 3. Check for suspicious keywords in URL
  for (const word of SUSPICIOUS_KEYWORDS) {
    if (lowerUrl.includes(word)) {
      warnings.push(`⚠️ Contains suspicious keyword: '${word}'`);
    }
  }

  // 4. Check if domain is trusted
  const isTrusted = TRUSTED_DOMAINS.some((domain) => url.includes(domain));
  if (!isTrusted) {
    warnings.push("⚠️ Domain not in trusted list");
  }

  // 5. Check for common phishing patterns
  if (
    lowerUrl.includes("bit.ly") ||
    lowerUrl.includes("tinyurl.com") ||
    lowerUrl.includes("goo.gl")
  ) {
    warnings.push("⚠️ Uses URL shortener (could hide malicious destination)");
  }

  // 6. Check for typosquatting patterns
  const commonTypos = [
    "goggle.com",
    "facebok.com",
    "amazom.com",
    "microsft.com",
  ];
  for (const typo of commonTypos) {
    if (lowerUrl.includes(typo)) {
      warnings.push("⚠️ Possible typosquatting detected");
      break;
    }
  }

  // 7. Check for mixed content (HTTP on HTTPS page)
  if (url.startsWith("http://") && window.location.protocol === "https:") {
    warnings.push("⚠️ Insecure HTTP connection");
  }

  return warnings;
}

function displayResult(url, warnings) {
  resultSection.style.display = "block";

  if (warnings.length === 0) {
    // Safe URL
    resultSection.className = "result-section safe";
    resultIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    resultTitle.textContent = "URL appears safe ✅";
    resultContent.innerHTML = `
            <p><strong>${url}</strong> passed all security checks.</p>
            <p>However, always verify URLs through official channels and never enter personal information on suspicious websites.</p>
        `;
  } else {
    // Suspicious URL
    resultSection.className = "result-section warning";
    resultIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    resultTitle.textContent = "Suspicious URL detected ⚠️";
    resultContent.innerHTML = `
            <p><strong>${url}</strong> shows the following warning signs:</p>
            <ul>
                ${warnings.map((warning) => `<li>${warning}</li>`).join("")}
            </ul>
            <p><strong>Recommendation:</strong> Do not proceed with this URL. If you believe this is a legitimate website, contact the organization directly through their official channels.</p>
        `;
  }

  // Scroll to result
  resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function showError(message) {
  resultSection.style.display = "block";
  resultSection.className = "result-section danger";
  resultIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
  resultTitle.textContent = "Invalid Input";
  resultContent.innerHTML = `<p>${message}</p>`;

  resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function clearUrl() {
  urlInput.value = "";
  resultSection.style.display = "none";
  urlInput.focus();
}

// Add some interactive features
urlInput.addEventListener("input", function () {
  // Clear result when user starts typing
  if (resultSection.style.display !== "none") {
    resultSection.style.display = "none";
  }
});

// Add loading animation to check button
checkBtn.addEventListener("click", function () {
  if (!checkBtn.disabled) {
    checkBtn.style.transform = "scale(0.98)";
    setTimeout(() => {
      checkBtn.style.transform = "";
    }, 150);
  }
});

// Add keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + Enter to check URL
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    checkUrl();
  }

  // Escape to clear
  if (e.key === "Escape") {
    clearUrl();
  }
});

// Add tooltip functionality
function addTooltip(element, text) {
  element.addEventListener("mouseenter", function () {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = text;
    tooltip.style.cssText = `
            position: absolute;
            background: #2d3748;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.9rem;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        `;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + "px";
  });

  element.addEventListener("mouseleave", function () {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      tooltip.remove();
    }
  });
}

// Add tooltips to buttons
addTooltip(clearBtn, "Clear the input field (Escape key)");
addTooltip(checkBtn, "Check the URL for phishing indicators (Enter key)");
