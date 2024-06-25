
import './About.css';


export const About = () => {
  return (

    <div className='container-order'>
      <div className='frist-component'> <Frist /></div>
      <div className='secont-component'><Secont /></div>
      {/* <div className='therd-component'><DrupalServices /></div> */}

    </div>
  )
}


const Secont = () => {
  return (
    <>
      <div className="conteiainer">
        <h1>Get to know us</h1>
        <div className='lines'> <hr /></div>

        <div className="section">
          <div className="cards">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTndwiU8Dgrj-2Z8YobE6e6MCGKtFhyK3n1mmu37zXTOaRTvPf_" alt="Leadership Icon" />
            <h2>LEADERSHIP</h2>
            <p className='Paragraph'>Our multicultural leaders have deep start-up and enterprise experience, with rich mobile and data expertise.</p>
          </div>
          <div className="cards">
            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRQs68bNe6Ds0jnsA1IfaF_lTs9P3Lm2ecNKzGN2aI6aKwdxX_N" alt="Careers Icon" />
            <h2>CAREERS</h2>
            <p className='Paragraph'>We take great pride in our market leadership position, thanks to the hard work of our incredibly talented.</p>
          </div>
          <div className="cards">
            <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSw6GloLkKvxFJlr8C7tler8ePQTArxboRbEdEadqcE4A-943mw" alt="Partnerships Icon" />
            <h2>PARTNERSHIPS</h2>
            <p className='Paragraph'>From research, to events, to platform partnerships, we work with thought leaders to provide more actionable data.</p>
          </div>
          <div className="cards">
            <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSz8azMQ7yvQ-ajuDhbnRnFqjfWK4xhGwCOO2OY-tHANypfJq6n" alt="Press Icon" />
            <h2>PRESS</h2>
            <p className='Paragraph'>We are at the forefront of the market s conversations and serve as the most trusted, global source.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export { Secont };




export const Frist = () => {
  return (
    <>
      <div className="about-container">
        <div className="image-containers">
          <img src="https://cdn.pixabay.com/photo/2021/11/22/20/20/online-6817350_640.jpg" alt="About Us" />
        </div>
        <div className="content-container">
          <h1>ABOUT US</h1>
          <p>
            Hackney started as a small interior design firm in downtown Michigan, aiming to help home buyers to make do with the new space that they had acquired. It soon became obvious that it would make sense to help our clients see beyond the walls and floor plans, and be there with them from the get-go.
          </p>
          <p>
            Currently, we offer house realtor, interior design, and architecture services in order to help our customers find their forever homes as seamlessly and painlessly as possible. We value our customers above everything else, meaning that we wont take OK as an answer.
          </p>
        </div>
      </div>

    </>
  )
}
const DrupalServices = () => {
  return (
    <div className="drupal-services">
      <div className="content">
        <h1>Get more out of your Drupal website with award-winning designs & marketers</h1>
        <p>Our exceptional developers will take your Drupal website to the next level.</p>
        <div className="logos">
          <img src="google-partner-logo.png" alt="Google Partner" />
          <img src="microsoft-partner-logo.png" alt="Microsoft Advertising Partner" />
          <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQpxEjZR4yuzQHwQXZdjYPBjdz6TRqQ4MzuM79U9e6jPtJ7DLtM" alt="HubSpot Certified Partner" />
          <img src="accredited-business-logo.png" alt="Accredited Business" />
          <img src="gsa-logo.png" alt="GSA Professional Services Schedule" />
          <img src="nbjiz-logo.png" alt="NJBIZ Top 250" />
          <img src="inc5000-logo.png" alt="Inc. 5000" />
        </div>
      </div>
      <div className="form-container">
        <h2>Get More Results with our Drupal services</h2>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" required />
          <button type="submit">Get Your Free Proposal</button>
        </form>
        <div className="need-help">
          <span>Need Help?</span>
          <img src="help-avatar.png" alt="Help Avatar" />
        </div>

      </div>

    </div>
  );
};

export { DrupalServices };