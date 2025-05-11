(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = {
      timestamp_js: new Date().toISOString(),
      user_agent_js: navigator.userAgent,
      device_js: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      referrer_js: document.referrer,
      url_js: window.location.href,
    };
  
    ['aff_sub1', 'aff_sub2', 'aff_sub3', 'aff_sub4', 'aff_sub5', 'campaign', 'adgroup', 'creative', 'extclid']
      .forEach(k => data[k] = urlParams.get(k) || '');
  
    try {
      const res = await fetch('https://ipapi.co/json/');
      const ip = await res.json();
      data.ip_js = ip.ip;
      data.city = ip.city;
      data.region = ip.region;
      data.country = ip.country;
    } catch (e) {
      console.error('Erro IP:', e);
    }
  
    fetch('https://seusite.com/track.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  })();
  