import '../components/css/TrendingBar.css'

function TrendingBar() {
  return (
    <div className="PJLV wpds-c-eUExSu wpds-c-eUExSu-PRook-justify-center">
      <ul data-link-group="live-bar" className="wpds-c-lfMEPF">
        <div className="wpds-c-bxxqXp wpds-c-bxxqXp-hsqqbW-type-live">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="14"
            viewBox="0 0 64 100"
          >
            <circle cx="15" cy="50" r="15" fill="currentColor">
              <animate
                attributeName="r"
                from="15"
                to="20"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
              ></animate>
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
              ></animate>
            </circle>
          </svg>
          LIVE
        </div>
        <li data-link-detail="1" className="wpds-c-iPlnLe">
          <a href="https://www.washingtonpost.com/elections/2024/07/25/2024-election-campaign-updates-harris-trump/">
            Election 2024
          </a>
        </li>
      </ul>
      <ul data-link-group="trending-bar" className="wpds-c-lfMEPF">
        <div className="wpds-c-bxxqXp">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="gray"
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
            role="img"
            className="wpds-c-eYTAYc wpds-c-kzNkoY"
          >
            <path
              fill="currentColor"
              d="m10.335 9.257 3.115-5.393.605 2.259.966-.26L13.986 2l-3.864 1.035.26.966 2.17-.582-2.925 5.066-3.002-3.238-.133.2-5.414 8.001.847.531L6.73 6.851l3.102 3.334.506-.925z"
            ></path>
          </svg>
          TRENDING
        </div>
        <li data-link-detail="1" className="wpds-c-iPlnLe">
          <a href="https://www.washingtonpost.com/elections/interactive/2024/harris-vp-pick-quiz-2024-election/">
            Harris’s VP pick
          </a>
        </li>
        <li data-link-detail="2" className="wpds-c-iPlnLe">
          <a href="https://www.washingtonpost.com/weather/2024/07/25/jasper-wildfire-alberta-canada/">
            Jasper wildfire
          </a>
        </li>
        <li data-link-detail="3" className="wpds-c-iPlnLe">
          <a href="https://www.washingtonpost.com/nation/2024/07/25/lgbtq-panic-defense-gay-trans-michigan/">
            ‘Gay and trans panic’
          </a>
        </li>
        <li data-link-detail="4" className="wpds-c-iPlnLe">
          <a href="https://www.washingtonpost.com/transportation/2024/07/25/southwest-ends-open-seating/">
            Southwest seating
          </a>
        </li>
        <li data-link-detail="5" className="wpds-c-iPlnLe">
          <a href="https://www.washingtonpost.com/health/2024/07/25/hiv-prevention-shot/">
            HIV shot
          </a>
        </li>
        <li data-link-detail="6" className="wpds-c-iPlnLe">
          <a href="https://www.washingtonpost.com/world/2024/07/25/komodo-dragon-teeth-lizard/">
            Komodo dragons
          </a>
        </li>
      </ul>
    </div>
  );
}

export default TrendingBar;
