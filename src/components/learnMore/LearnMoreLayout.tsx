import Header from './Header'
import InfoCard from './InfoCard'
import BenifitsForLender from './BenifitsForLender'
import BenifitsForBorrower from './BenifitsForBorrower'
import HowOurPlatformWorks from './HowOurPlatformWorks'
import SafetyMeasures from './SafetyMeasures'
import JoinCommunity from './JoinCommunity'

function LearnMoreLayout() {
  return (
    <div><div className="bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Header />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left column - Main content */}
        <div className="space-y-8">
          <InfoCard />
          <BenifitsForLender />
          <BenifitsForBorrower />
        </div>

        {/* Right column - Additional info */}
        <div className="space-y-8">
          <HowOurPlatformWorks />
          <SafetyMeasures />
          <JoinCommunity />
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default LearnMoreLayout