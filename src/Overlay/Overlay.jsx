import './styles.css'

export default function Overlay() {
  return (
    <div className="container">
      <header>
        <div className="brand">
          <img src="brand.svg" />
          <p>
            BIOTECH <strong>HEALTH</strong>
          </p>
        </div>
        <div>
          <ul>
            <li>Learn</li>
            <li>Numbers</li>
            <li>Engage</li>
          </ul>
        </div>
        <button>KNOW MORE</button>
      </header>

      <div className="main-wrapper">
        <section className="section section-1">
          <div className="wrapper">
            <h2>
              Revolutionary <strong>DNA Repair</strong>
            </h2>
            <p>
              Introducing a groundbreaking new drug that redefines{' '}
              <strong>aging at the cellular level</strong>. Experience a new era of mental clarity
              and youthful energy—because <strong>aging is no longer a one-way street.</strong>
            </p>
          </div>
        </section>

        <section className="section section-2">
          <div className="wrapper">
            <h2>
              The <strong>Future</strong> of Cognitive Health
            </h2>
            <p>
              This breakthrough medicine goes beyond traditional treatments by directly{' '}
              <strong>targeting DNA to trigger cellular regeneration in the brain</strong>. With
              cutting-edge technology, it repairs and revitalizes neural pathways, offering
              unprecedented benefits for mental clarity and cognitive health.
            </p>
            <ul>
              <li>
                DNA-driven cell repair for long-lasting <strong>brain rejuvenation</strong>
              </li>
              <li>
                Enhanced <strong>memory and cognitive</strong> function
              </li>
              <li>
                Increased <strong>mental sharpness</strong> and focus
              </li>
              <li>
                Support for overall <strong>brain health and longevity</strong>
              </li>
            </ul>
          </div>
        </section>

        <section className="section section-3">
          <div className="card-wrapper">
            <div className="card">
              <h2>85%</h2>
              <p>
                Over 85% of participants experienced significant improvements in memory and
                cognitive function within the first 6 weeks
              </p>
            </div>
            <div className="card">
              <h2>85%</h2>
              <p>
                Over 85% of participants experienced significant improvements in memory and
                cognitive function within the first 6 weeks
              </p>
            </div>
          </div>
          <div className="numbers-title">
            <h2>
              BRAIN HEALTH <strong>BY THE NUMBERS</strong>
            </h2>
            <p>
              In clinical trials, this revolutionary medication has shown remarkable results. This
              cutting-edge treatment is proving to be a game-changer in brain health and longevity.
            </p>
          </div>
        </section>
      </div>

      <footer>
        <div className="footer-left">
          <h3>The time is now</h3>
          <p>The path is forward</p>
          <div className="social">
            <img src="instagram.svg" width={30} />
            <img src="youtube.svg" width={30} />
            <img src="linkedin.svg" width={30} />
          </div>
          <p className="copyright">Copyright @andersonmancini.dev. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <img src="brand.svg" width={60} />

          <ul>
            <li>Privacy policy</li>
            <li>Terms of service</li>
            <li>Cookie policy</li>
            <li>Disclaimer</li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
