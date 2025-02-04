import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useStoryClient } from '../hooks/useStoryClient';

export default function RegisterIP() {
  const { address } = useAccount();
  const { client } = useStoryClient();
  const [loading, setLoading] = useState(false);

  const registerIP = async () => {
    if (!address || !client) return;
    
    setLoading(true);
    try {
      // Create IP asset
      const ipAsset = await client.ipAsset.create({
        name: 'Curmunchkins',
        description: 'Brand IP for Curmunchkins',
        mediaUrl: '', // Add your logo URL
        ownerAddress: address,
        tokenURI: '', // Add IPFS URI for metadata
      });

      // Set license parameters
      await client.licensing.setLicenseParams({
        ipAssetId: ipAsset.id,
        commercialUse: true,
        derivativesAllowed: true,
        reciprocal: false,
        royaltyPercentage: 5,
      });

      console.log('IP registered successfully:', ipAsset.id);
    } catch (error) {
      console.error('Error registering IP:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Register Curmunchkins IP</h1>
      <button
        onClick={registerIP}
        disabled={loading || !address}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Registering...' : 'Register IP'}
      </button>
    </div>
  );
}