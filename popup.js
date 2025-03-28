document.addEventListener('DOMContentLoaded', function () {
    const operatorSelect = document.getElementById('operatorSelect');
    const inputFields = document.getElementById('inputFields');
    const helpIcon = document.getElementById('helpIcon');
    const historyIcon = document.getElementById('historyIcon');
    const tooltip = document.getElementById('tooltip');
    const searchForm = document.getElementById('searchForm');
    const historyContainer = document.getElementById('historyContainer');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
  
    // Mapping of operator values to their descriptions
    const operatorDescriptions = {
      "site": "site:example.com – Show all indexed pages of a specific website.",
      "cache": "cache:example.com – View Google’s last cached version of a page.",
      "related": "related:example.com – Find websites similar to a given domain.",
      "intitle": "intitle:\"keyword\" – Find pages with an exact keyword in the title.",
      "allintitle": "allintitle:keyword1 keyword2 – Find pages where all specified words are in the title.",
      "inurl": "inurl:\"keyword\" – Find pages that have a keyword in the URL.",
      "allinurl": "allinurl:keyword1 keyword2 – Find pages where all specified words are in the URL.",
      "intext": "intext:\"keyword\" – Find pages that contain an exact keyword in the content.",
      "allintext": "allintext:keyword1 keyword2 – Find pages where all specified words appear in the content.",
      "filetype": "filetype: – Search for specific file types. Optionally add a keyword.",
      "exclude": "\"keyword\" -site:example.com – Exclude a specific site from the search results.",
      "subdirectory": "site:example.com/blog – See indexed pages from a specific subdirectory.",
      "daterange": "before/after – Filter search results by date range. Optionally add a keyword.",
      "oroperator": "\"keyword\" OR \"keyword2\" – Search for multiple keyword variations.",
      "inanchor": "site:example.com inanchor:\"keyword\" – Find pages with a keyword in anchor text.",
      "subdomain": "site:example.com -inurl:www – Identify subdomains of a website.",
      "broken": "site:example.com intitle:\"404\" – Discover broken pages on a website.",
      "guestposting": "\"write for us\" – Find guest posting opportunities. Choose one or more TLDs.",
      "wordpress": "\"keyword\" + \"powered by WordPress\" – Locate niche-specific WordPress sites.",
      "techaudit": "site:example.com ext:css OR ext:js – Find CSS or JavaScript files on a website for technical audits.",
      "define": "define: – Get dictionary definitions for a word.",
      "around": "AROUND(n) – Find pages where two keywords appear near each other.",
      "link": "link: – Find pages that link to a specific URL."
    };
  
    // Function to update search fields based on selected operator
    function updateFields() {
      const operator = operatorSelect.value;
      tooltip.textContent = operatorDescriptions[operator] || "";
      let html = '';
  
      switch(operator) {
        case 'site':
        case 'cache':
        case 'related':
        case 'subdomain':
        case 'broken':
        case 'techaudit':
        case 'link':
          html = `<label for="param1">Domain / URL:</label>
                  <input type="text" id="param1" placeholder="example.com">`;
          break;
        case 'intitle':
        case 'inurl':
        case 'intext':
        case 'wordpress':
          html = `<label for="param1">Keyword / Value:</label>
                  <input type="text" id="param1" placeholder="Enter keyword">`;
          break;
        case 'allintitle':
        case 'allinurl':
        case 'allintext':
          html = `<label for="param1">Keywords (separated by space):</label>
                  <input type="text" id="param1" placeholder="keyword1 keyword2">`;
          break;
        case 'filetype':
          html = `<label for="param1">File Type:</label>
                  <select id="param1">
                    <option value="pdf">PDF</option>
                    <option value="doc">DOC</option>
                    <option value="docx">DOCX</option>
                    <option value="xls">XLS</option>
                    <option value="xlsx">XLSX</option>
                    <option value="ppt">PPT</option>
                    <option value="pptx">PPTX</option>
                    <option value="txt">TXT</option>
                    <option value="other">Other (enter below)</option>
                  </select>
                  <div id="filetypeExtra" style="display:none; margin-top:5px;">
                    <input type="text" id="paramExtra" placeholder="Enter file extension">
                  </div>
                  <label for="param2">Keyword (optional):</label>
                  <input type="text" id="param2" placeholder="Enter keyword">`;
          break;
        case 'exclude':
          html = `<label for="param1">Keyword:</label>
                  <input type="text" id="param1" placeholder="Enter keyword">
                  <label for="param2">Site to Exclude:</label>
                  <input type="text" id="param2" placeholder="example.com">`;
          break;
        case 'subdirectory':
          html = `<label for="param1">Site with Subdirectory:</label>
                  <input type="text" id="param1" placeholder="example.com/blog">`;
          break;
        case 'daterange':
          html = `<label for="param1">Before:</label>
                  <input type="date" id="param1">
                  <label for="param2">After:</label>
                  <input type="date" id="param2">
                  <label for="param3">Keyword (optional):</label>
                  <input type="text" id="param3" placeholder="Enter keyword (optional)">`;
          break;
        case 'oroperator':
          html = `<label for="param1">Keyword 1:</label>
                  <input type="text" id="param1" placeholder="First keyword">
                  <label for="param2">Keyword 2:</label>
                  <input type="text" id="param2" placeholder="Second keyword">`;
          break;
        case 'inanchor':
          html = `<label for="param1">Domain:</label>
                  <input type="text" id="param1" placeholder="example.com">
                  <label for="param2">Anchor Keyword:</label>
                  <input type="text" id="param2" placeholder="Enter keyword">`;
          break;
        case 'guestposting':
          html = `<label for="param1">TLDs (comma separated, e.g., com, net, org):</label>
                  <input type="text" id="param1" placeholder="com, net, org">`;
          break;
        case 'define':
          html = `<label for="param1">Word:</label>
                  <input type="text" id="param1" placeholder="Enter word">`;
          break;
        case 'around':
          html = `<label for="param1">Keyword 1:</label>
                  <input type="text" id="param1" placeholder="First keyword">
                  <label for="param2">Keyword 2:</label>
                  <input type="text" id="param2" placeholder="Second keyword">
                  <label for="param3">Distance (n):</label>
                  <input type="number" id="param3" placeholder="e.g., 3">`;
          break;
        default:
          html = `<label for="param1">Keyword:</label>
                  <input type="text" id="param1" placeholder="Enter keyword">`;
      }
      inputFields.innerHTML = html;
  
      if (operator === "filetype") {
        const fileTypeSelect = document.getElementById('param1');
        const filetypeExtra = document.getElementById('filetypeExtra');
        fileTypeSelect.addEventListener('change', function() {
          filetypeExtra.style.display = fileTypeSelect.value === "other" ? "block" : "none";
        });
      }
    }
  
    operatorSelect.addEventListener('change', updateFields);
    updateFields();
  
    // Tooltip display on help icon hover
    helpIcon.addEventListener('mouseenter', function(e) {
      const rect = helpIcon.getBoundingClientRect();
      tooltip.style.left = (rect.left - 109) + "px";
      tooltip.style.top = (rect.bottom + 5) + "px";
      tooltip.style.display = "block";
    });
    helpIcon.addEventListener('mouseleave', function() {
      tooltip.style.display = "none";
    });
  
    // Toggle history view on history icon click
    historyIcon.addEventListener('click', function() {
      if (historyContainer.style.display === "none") {
        updateHistoryList();
        historyContainer.style.display = "block";
      } else {
        historyContainer.style.display = "none";
      }
    });
  
    // Save search history to localStorage
    function saveHistory(query) {
      let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
      history.unshift({ query: query, date: new Date().toLocaleString() });
      localStorage.setItem("searchHistory", JSON.stringify(history));
    }
  
    // Update the history list in the UI
    function updateHistoryList() {
      const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
      historyList.innerHTML = "";
      history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.date}: ${item.query}`;
        historyList.appendChild(li);
      });
    }
  
    // Clear history button
    clearHistoryBtn.addEventListener('click', function() {
      localStorage.removeItem("searchHistory");
      updateHistoryList();
    });
  
    // Form submission: build query, save history, and open Google search in a new tab
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const operator = operatorSelect.value;
      let query = '';
  
      switch(operator) {
        case 'site': {
          const param1 = document.getElementById('param1') ? document.getElementById('param1').value.trim() : '';
          query = `site:${param1}`;
          break;
        }
        case 'cache': {
          const param1 = document.getElementById('param1') ? document.getElementById('param1').value.trim() : '';
          query = `cache:${param1}`;
          break;
        }
        case 'related': {
          const param1 = document.getElementById('param1') ? document.getElementById('param1').value.trim() : '';
          query = `related:${param1}`;
          break;
        }
        case 'intitle': {
          const param1 = document.getElementById('param1').value.trim();
          query = `intitle:"${param1}"`;
          break;
        }
        case 'allintitle': {
          const param1 = document.getElementById('param1').value.trim();
          query = `allintitle:${param1}`;
          break;
        }
        case 'inurl': {
          const param1 = document.getElementById('param1').value.trim();
          query = `inurl:"${param1}"`;
          break;
        }
        case 'allinurl': {
          const param1 = document.getElementById('param1').value.trim();
          query = `allinurl:${param1}`;
          break;
        }
        case 'intext': {
          const param1 = document.getElementById('param1').value.trim();
          query = `intext:"${param1}"`;
          break;
        }
        case 'allintext': {
          const param1 = document.getElementById('param1').value.trim();
          query = `allintext:${param1}`;
          break;
        }
        case 'filetype': {
          const fileTypeSelect = document.getElementById('param1');
          let fileExt = fileTypeSelect.value;
          if (fileExt === "other") {
            fileExt = document.getElementById('paramExtra').value.trim();
          }
          const keyword = document.getElementById('param2').value.trim();
          query = keyword ? `${keyword} filetype:${fileExt}` : `filetype:${fileExt}`;
          break;
        }
        case 'exclude': {
          const param1 = document.getElementById('param1').value.trim();
          const param2 = document.getElementById('param2').value.trim();
          query = `"${param1}" -site:${param2}`;
          break;
        }
        case 'subdirectory': {
          const param1 = document.getElementById('param1').value.trim();
          query = `site:${param1}`;
          break;
        }
        case 'daterange': {
          const beforeDate = document.getElementById('param1').value.trim();
          const afterDate = document.getElementById('param2').value.trim();
          const keyword = document.getElementById('param3').value.trim();
          query = keyword ? `${keyword} before:${beforeDate} after:${afterDate}` : `before:${beforeDate} after:${afterDate}`;
          break;
        }
        case 'oroperator': {
          const param1 = document.getElementById('param1').value.trim();
          const param2 = document.getElementById('param2').value.trim();
          query = `"${param1}" OR "${param2}"`;
          break;
        }
        case 'inanchor': {
          const param1 = document.getElementById('param1').value.trim();
          const param2 = document.getElementById('param2').value.trim();
          if (!param1 || !param2) {
            alert("Please enter both a domain and an anchor keyword.");
            return;
          }
          query = `site:${param1} inanchor:"${param2}"`;
          break;
        }
        case 'subdomain': {
          const param1 = document.getElementById('param1').value.trim();
          query = `site:${param1} -inurl:www`;
          break;
        }
        case 'broken': {
          const param1 = document.getElementById('param1').value.trim();
          query = `site:${param1} intitle:"404"`;
          break;
        }
        case 'guestposting': {
          let tlds = document.getElementById('param1').value.trim();
          if (!tlds) {
            tlds = "com";
          }
          const tldArray = tlds.split(',').map(t => t.trim()).filter(t => t);
          const siteQueries = tldArray.map(tld => `site:.${tld}`).join(" OR ");
          query = `"write for us" ${siteQueries}`;
          break;
        }
        case 'wordpress': {
          const param1 = document.getElementById('param1').value.trim();
          query = `"${param1}" + "powered by WordPress"`;
          break;
        }
        case 'techaudit': {
          const param1 = document.getElementById('param1').value.trim();
          query = `site:${param1} ext:css OR ext:js`;
          break;
        }
        case 'define': {
          const param1 = document.getElementById('param1').value.trim();
          query = `define:${param1}`;
          break;
        }
        case 'around': {
          const param1 = document.getElementById('param1').value.trim();
          const param2 = document.getElementById('param2').value.trim();
          const param3 = document.getElementById('param3').value.trim();
          if (!param1 || !param2 || !param3) {
            alert("Please enter both keywords and the distance.");
            return;
          }
          query = `${param1} AROUND(${param3}) ${param2}`;
          break;
        }
        case 'link': {
          const param1 = document.getElementById('param1').value.trim();
          query = `link:${param1}`;
          break;
        }
        default: {
          const param1 = document.getElementById('param1').value.trim();
          query = param1;
        }
      }
  
      // Save query history with date/time
      saveHistory(query);
  
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      chrome.tabs.create({ url: googleUrl });
    });
  });
  