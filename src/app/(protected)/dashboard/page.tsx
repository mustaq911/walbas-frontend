import { getActiveBids, getWonAuctions } from '@/lib/api';
import BidCard from '@/components/BidCard';
import AuctionCard from '@/components/AuctionCard';

export default async function DashboardPage() {
  const [activeBids, wonAuctions] = await Promise.all([
    getActiveBids(),
    getWonAuctions()
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">My Dashboard</h1>
      
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Active Bids</h2>
        {activeBids.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeBids.map(bid => (
              <BidCard
                key={bid.id}
                bid={{
                  ...bid,
                  product: {
                    ...bid.product,
                    endTime: new Date(bid.product.endTime),
                  },
                  createdAt: new Date(bid.createdAt),
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no active bids</p>
        )}
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4">Won Auctions</h2>
        {wonAuctions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wonAuctions.map(auction => (
              <AuctionCard
                key={auction.id}
                auction={{
                  ...auction,
                  wonAt: new Date(auction.wonAt),
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven&#39;t won any auctions yet</p>
        )}
      </section>
    </div>
  );
}