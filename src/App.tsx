import { useState } from 'react'
import '../page-3.css'

const FUND_OPTIONS = [
  'RSP / RRSP (Canada)',
  '401K (USA)',
  'Super Nation (Australia)',
  'Super Kiwi (New Zealand)',
  'SIP / Self Income Plan (UK)',
  'TFSA (Canada)',
  'LIDA / Pension Plan',
  'Severance Package',
  'Cash / Personal Savings',
]

async function submitForm(payload: Record<string, string>) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}

function App() {
  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4500)
  }

  // Hero form state
  const [hero, setHero] = useState({ fullName: '', email: '', phone: '', fundSource: '', amount: '' })
  const [heroLoading, setHeroLoading] = useState(false)
  const [heroError, setHeroError] = useState('')

  // Bottom form state
  const [invest, setInvest] = useState({ firstName: '', lastName: '', email: '', phone: '', fundSource: '', amount: '', notes: '' })
  const [investLoading, setInvestLoading] = useState(false)
  const [investError, setInvestError] = useState('')

  async function handleHeroSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setHeroLoading(true)
    setHeroError('')
    try {
      const data = await submitForm(hero)
      if (data.success) {
        setHero({ fullName: '', email: '', phone: '', fundSource: '', amount: '' })
        showToast('Thank you! We\'ll be in touch within 24 hours.', 'success')
      } else {
        setHeroError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setHeroError('Network error. Please try again.')
    } finally {
      setHeroLoading(false)
    }
  }

  async function handleInvestSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setInvestLoading(true)
    setInvestError('')
    try {
      const data = await submitForm(invest)
      if (data.success) {
        setInvest({ firstName: '', lastName: '', email: '', phone: '', fundSource: '', amount: '', notes: '' })
        showToast('Thank you! An investment specialist will contact you within 24 hours.', 'success')
      } else {
        setInvestError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setInvestError('Network error. Please try again.')
    } finally {
      setInvestLoading(false)
    }
  }

  return (
    <>
      {/* TOAST */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
          {toast.message}
        </div>
      )}

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-logo">
            <a href="#"><img src="/Image-box/Main-Logo-2.png" alt="Ricoh International Logo" /></a>
          </div>
          <div className="navbar-cta">
            <a href="#invest" className="btn-gold">Invest Now</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">Limited Shares Available — Accredited Investors Only</div>
              <h1 className="hero-title">
                Your Bank Gives 2%.<br />
                <span>We Give You<br />8–10% Returns.</span>
              </h1>
              <p className="hero-subtitle">
                Ricoh International is selling <strong>40 million shares</strong> to raise $2 million for
                shipping and warehouse operations. We invest in real assets — warehouses, heavy equipment,
                and commercial buildings in <strong>Africa and Canada</strong>.
              </p>
              <ul className="hero-points">
                <li><i className="fa-solid fa-circle-check"></i> 8–10% annual returns vs. 2% bank interest</li>
                <li><i className="fa-solid fa-circle-check"></i> Backed by light steel houses, containers &amp; heavy equipment</li>
                <li><i className="fa-solid fa-circle-check"></i> Use RSP, 401K, TFSA, pension, cash &amp; more</li>
                <li><i className="fa-solid fa-circle-check"></i> Public company — transparent &amp; accredited structure</li>
              </ul>
              <div className="hero-btns">
                <a href="#invest" className="btn-gold">Get Share Information</a>
                <a href="#assets" className="btn-outline">View Our Assets</a>
              </div>
            </div>
            <div className="hero-side">
              <div className="hero-form-box">
                <h3>Request <span className="gold-text">Share Info</span></h3>
                <p className="form-tagline">Express your interest — we respond within 24 hours</p>

                <form onSubmit={handleHeroSubmit}>
                    <input
                      type="text"
                      className="fake-input"
                      placeholder="Full Name"
                      value={hero.fullName}
                      onChange={e => setHero(p => ({ ...p, fullName: e.target.value }))}
                      required
                    />
                    <input
                      type="email"
                      className="fake-input"
                      placeholder="Email Address"
                      value={hero.email}
                      onChange={e => setHero(p => ({ ...p, email: e.target.value }))}
                      required
                    />
                    <input
                      type="tel"
                      className="fake-input"
                      placeholder="Phone / WhatsApp Number"
                      value={hero.phone}
                      onChange={e => setHero(p => ({ ...p, phone: e.target.value }))}
                      required
                    />
                    <select
                      className="fake-input"
                      title="Fund Source"
                      value={hero.fundSource}
                      onChange={e => setHero(p => ({ ...p, fundSource: e.target.value }))}
                    >
                      <option value="" disabled>Select Your Fund Source</option>
                      {FUND_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                    <input
                      type="text"
                      className="fake-input"
                      placeholder="Investment Amount (USD)"
                      value={hero.amount}
                      onChange={e => setHero(p => ({ ...p, amount: e.target.value }))}
                    />
                    {heroError && <p className="form-error">{heroError}</p>}
                    <button type="submit" className="btn-gold" disabled={heroLoading}>
                      {heroLoading
                        ? 'Sending…'
                        : <span>Send My Interest &nbsp;<i className="fa-solid fa-arrow-right"></i></span>
                      }
                    </button>
                    <p className="form-note"><i className="fa-solid fa-lock"></i> 100% confidential. No spam, ever.</p>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item"><h3>40M</h3><p>Shares Offered</p></div>
            <div className="stat-item"><h3>$2M</h3><p>Target Raise</p></div>
            <div className="stat-item"><h3>8–10%</h3><p>Annual Returns</p></div>
            <div className="stat-item"><h3>2%</h3><p>Average Bank Rate</p></div>
          </div>
        </div>
      </div>

      {/* ASSETS SHOWCASE */}
      <section className="assets" id="assets">
        <div className="container">
          <p className="section-title gold-text">Our Real Asset Portfolio</p>
          <div className="gold-divider"></div>
          <p className="section-subtitle">Warehouses — Heavy Equipment — Steel &amp; Container Structures</p>
          <div className="assets-grid">
            <div className="asset-card">
              <div className="asset-img">
                <i className="fa-solid fa-house"></i>
                <span className="asset-tag">Africa / Canada</span>
              </div>
              <div className="asset-info">
                <h3>Light Steel Houses</h3>
                <p>Prefabricated light steel housing units for rapid deployment across African and Canadian markets. Durable, scalable, high-demand.</p>
                <div className="asset-meta">
                  <span><i className="fa-solid fa-check"></i> Prefab Construction</span>
                  <span><i className="fa-solid fa-check"></i> High Demand</span>
                </div>
              </div>
            </div>
            <div className="asset-card">
              <div className="asset-img">
                <i className="fa-solid fa-box"></i>
                <span className="asset-tag">Africa / Canada</span>
              </div>
              <div className="asset-info">
                <h3>Container Houses</h3>
                <p>Modular container homes offering affordable housing solutions. Built for Africa and Canada — growing demand for flexible, low-cost accommodation.</p>
                <div className="asset-meta">
                  <span><i className="fa-solid fa-check"></i> Modular Design</span>
                  <span><i className="fa-solid fa-check"></i> Cost Efficient</span>
                </div>
              </div>
            </div>
            <div className="asset-card">
              <div className="asset-img">
                <i className="fa-solid fa-tractor"></i>
                <span className="asset-tag">Africa</span>
              </div>
              <div className="asset-info">
                <h3>Heavy Equipment — Africa</h3>
                <p>Construction and infrastructure machinery deployed across African project sites. High utilization rates and strong revenue potential in growing markets.</p>
                <div className="asset-meta">
                  <span><i className="fa-solid fa-check"></i> High Utilization</span>
                  <span><i className="fa-solid fa-check"></i> Emerging Markets</span>
                </div>
              </div>
            </div>
            <div className="asset-card">
              <div className="asset-img">
                <i className="fa-solid fa-truck-moving"></i>
                <span className="asset-tag">Canada</span>
              </div>
              <div className="asset-info">
                <h3>Heavy Equipment — Canada</h3>
                <p>Industrial heavy equipment for Canadian construction and resource sectors. Backed by long-term operational contracts and government infrastructure projects.</p>
                <div className="asset-meta">
                  <span><i className="fa-solid fa-check"></i> Long-Term Contracts</span>
                  <span><i className="fa-solid fa-check"></i> Resource Sector</span>
                </div>
              </div>
            </div>
            <div className="asset-card">
              <div className="asset-img">
                <i className="fa-solid fa-warehouse"></i>
                <span className="asset-tag">Operations</span>
              </div>
              <div className="asset-info">
                <h3>Warehouse Operations</h3>
                <p>Strategically located warehouse facilities supporting shipping and distribution for Africa and Canada corridors. Generating consistent rental and operational income.</p>
                <div className="asset-meta">
                  <span><i className="fa-solid fa-check"></i> Strategic Locations</span>
                  <span><i className="fa-solid fa-check"></i> Steady Income</span>
                </div>
              </div>
            </div>
            <div className="asset-card">
              <div className="asset-img">
                <i className="fa-solid fa-ship"></i>
                <span className="asset-tag">Logistics</span>
              </div>
              <div className="asset-info">
                <h3>Shipping Operations</h3>
                <p>International shipping infrastructure connecting manufacturing sources to African and Canadian markets. End-to-end logistics for all assets and equipment.</p>
                <div className="asset-meta">
                  <span><i className="fa-solid fa-check"></i> International Routes</span>
                  <span><i className="fa-solid fa-check"></i> End-to-End Logistics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUND SOURCES */}
      <section className="fund-sources">
        <div className="container">
          <div className="fund-sources-header">
            <p className="eyebrow">Eligible Investment Vehicles</p>
            <h2 className="section-title">Use Your <span className="gold-text">Existing Funds</span></h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">RSP, 401K, Super, TFSA, pension, severance or cash — your money, working harder</p>
          </div>
          <div className="fund-grid">
            <div className="fund-card">
              <div className="fund-icon"><i className="fa-solid fa-building-columns"></i></div>
              <p className="fund-num">Canada</p>
              <h3>RSP / RRSP</h3>
              <p>Use your Registered Retirement Savings Plan through a self-directed account to invest in Ricoh International shares.</p>
            </div>
            <div className="fund-card">
              <div className="fund-icon"><i className="fa-solid fa-flag-usa"></i></div>
              <p className="fund-num">USA</p>
              <h3>401K Pension</h3>
              <p>American 401K holders can redirect pension funds into high-yield share investments through approved international channels.</p>
            </div>
            <div className="fund-card">
              <div className="fund-icon"><i className="fa-solid fa-sun"></i></div>
              <p className="fund-num">Australia</p>
              <h3>Super Nation</h3>
              <p>Australian Super fund holders can explore self-managed super fund (SMSF) pathways to invest in international share offerings.</p>
            </div>
            <div className="fund-card">
              <div className="fund-icon"><i className="fa-solid fa-leaf"></i></div>
              <p className="fund-num">New Zealand</p>
              <h3>Super Kiwi</h3>
              <p>New Zealand KiwiSaver and Super fund investors can access international share investment opportunities through approved vehicles.</p>
            </div>
            <div className="fund-card">
              <div className="fund-icon"><i className="fa-brands fa-british-pound-sign"></i></div>
              <p className="fund-num">United Kingdom</p>
              <h3>SIP / Self Income Plan</h3>
              <p>UK investors can use SIPP and Self Income Plan (SIP) structures to invest in Ricoh International's share offering.</p>
            </div>
            <div className="fund-card">
              <div className="fund-icon"><i className="fa-solid fa-coins"></i></div>
              <p className="fund-num">Canada / Global</p>
              <h3>TFSA, LIDA &amp; Cash</h3>
              <p>TFSA, LIDA, pension plans, severance packages, and personal cash holdings are all eligible investment sources.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How The <span className="gold-text">Investment Works</span></h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">From your existing fund to 8–10% returns — four simple steps</p>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-icon"><i className="fa-solid fa-wallet"></i></div>
              <h4>Choose Your Fund Source</h4>
              <p>Select the investment vehicle you'll use — RSP, 401K, TFSA, cash, or any eligible fund</p>
            </div>
            <div className="step-item">
              <div className="step-icon"><i className="fa-solid fa-file-signature"></i></div>
              <h4>Express Your Interest</h4>
              <p>Submit the form and our team contacts you with full share details, prospectus and next steps</p>
            </div>
            <div className="step-item">
              <div className="step-icon"><i className="fa-solid fa-chart-pie"></i></div>
              <h4>Shares Allocated</h4>
              <p>Your investment is allocated to Ricoh International's 40 million share offering — real assets backing every share</p>
            </div>
            <div className="step-item">
              <div className="step-icon"><i className="fa-solid fa-coins"></i></div>
              <h4>Earn 8–10% Returns</h4>
              <p>Your capital works in warehouses, heavy equipment and commercial buildings — generating returns above any bank rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <div className="container">
          <div className="why-content">
            <div className="why-text">
              <h2>If Your Bank Isn't <span className="gold-text">Giving You Good Returns,</span> Join Us.</h2>
              <p>We invest in warehouses, heavy equipment, and commercial buildings — real assets that generate consistent returns. Not paper. Not promises. Real infrastructure in Africa and Canada.</p>
              <blockquote>
                "We invest in warehouse, heavy equipment, and commercial buildings.<br />
                If your bank isn't giving you good returns — join us."
              </blockquote>
              <p>Ricoh International is a public company offering accredited investors the opportunity to participate in a $2 million share raise — backed by tangible assets and long-term operational contracts.</p>
              <a href="#invest" className="btn-gold">Invest in Ricoh International</a>
            </div>
            <div className="why-cards">
              <div className="why-card">
                <div className="why-icon"><i className="fa-solid fa-landmark"></i></div>
                <h4>Asset-Backed Shares</h4>
                <p>Every share backed by real warehouses, equipment &amp; buildings</p>
              </div>
              <div className="why-card">
                <div className="why-icon"><i className="fa-solid fa-percent"></i></div>
                <h4>8–10% Returns</h4>
                <p>4–5x better than average bank savings rate of 2%</p>
              </div>
              <div className="why-card">
                <div className="why-icon"><i className="fa-solid fa-globe"></i></div>
                <h4>Global Markets</h4>
                <p>Operations in Africa and Canada — diversified exposure</p>
              </div>
              <div className="why-card">
                <div className="why-icon"><i className="fa-solid fa-shield-halved"></i></div>
                <h4>Public Company</h4>
                <p>Transparent, accredited structure — distinct from Ricoh Central</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVEST FORM */}
      <section className="form-section" id="invest">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-info">
              <h2>Invest in <span className="gold-text">Ricoh International</span></h2>
              <p>Fill in your details and one of our investment specialists will contact you within 24 hours with full share information, prospectus, and how to allocate your funds.</p>
              <ul className="form-benefits">
                <li><i className="fa-solid fa-arrow-right"></i> 40 million shares — act before they're gone</li>
                <li><i className="fa-solid fa-arrow-right"></i> 8–10% returns for accredited investors</li>
                <li><i className="fa-solid fa-arrow-right"></i> Use RSP, 401K, TFSA, pension or cash</li>
                <li><i className="fa-solid fa-arrow-right"></i> Backed by real assets in Africa &amp; Canada</li>
                <li><i className="fa-solid fa-arrow-right"></i> Response within 24 hours guaranteed</li>
              </ul>
            </div>
            <div className="ghl-form-box">
              <h3>Get Your <span className="gold-text">Investment Package</span></h3>
              <p className="form-tagline">Fill in your details — takes less than 60 seconds</p>

              <form onSubmit={handleInvestSubmit}>
                  <input
                    type="text"
                    className="fake-input"
                    placeholder="First Name"
                    value={invest.firstName}
                    onChange={e => setInvest(p => ({ ...p, firstName: e.target.value }))}
                    required
                  />
                  <input
                    type="text"
                    className="fake-input"
                    placeholder="Last Name"
                    value={invest.lastName}
                    onChange={e => setInvest(p => ({ ...p, lastName: e.target.value }))}
                    required
                  />
                  <input
                    type="email"
                    className="fake-input"
                    placeholder="Email Address"
                    value={invest.email}
                    onChange={e => setInvest(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                  <input
                    type="tel"
                    className="fake-input"
                    placeholder="Phone / WhatsApp Number"
                    value={invest.phone}
                    onChange={e => setInvest(p => ({ ...p, phone: e.target.value }))}
                    required
                  />
                  <select
                    className="fake-input"
                    title="Fund Source"
                    value={invest.fundSource}
                    onChange={e => setInvest(p => ({ ...p, fundSource: e.target.value }))}
                  >
                    <option value="" disabled>Select Your Fund Source</option>
                    {FUND_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <input
                    type="text"
                    className="fake-input"
                    placeholder="Investment Amount (USD)"
                    value={invest.amount}
                    onChange={e => setInvest(p => ({ ...p, amount: e.target.value }))}
                  />
                  <textarea
                    className="fake-input textarea-notes"
                    rows={3}
                    placeholder="Any questions or additional notes"
                    value={invest.notes}
                    onChange={e => setInvest(p => ({ ...p, notes: e.target.value }))}
                  />
                  {investError && <p className="form-error">{investError}</p>}
                  <button type="submit" className="btn-gold" disabled={investLoading}>
                    {investLoading
                      ? 'Sending…'
                      : <span>Request Investment Package &nbsp;<i className="fa-solid fa-arrow-right"></i></span>
                    }
                  </button>
                  <p className="form-note"><i className="fa-solid fa-lock"></i> Your information is 100% secure. We never share or sell your details.</p>
                </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">
              <img src="/Image-box/Main-Logo-2.png" alt="Ricoh International Logo" />
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Ricoh International. All rights reserved. | This page is for accredited investors only. Investment involves risk. Ricoh International is distinct from Ricoh Central. Please consult a licensed financial advisor.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
