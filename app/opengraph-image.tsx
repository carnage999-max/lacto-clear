import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'LactoClear® - Clearing the Path for Peak Recovery';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(0, 208, 54, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 163, 232, 0.15) 0%, transparent 50%)',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#fff',
              letterSpacing: '-0.02em',
              display: 'flex',
              marginBottom: 20,
            }}
          >
            LactoClear<span style={{ color: '#00D036' }}>®</span>
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#9FA4A6',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            CLEAR YOUR PATH
          </div>
        </div>

        {/* Main Message */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 900,
            padding: '0 60px',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 600,
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.3,
              marginBottom: 24,
            }}
          >
            Breaking the Lactate Barrier
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#F2F2F2',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Advanced two-step protocol for mitochondrial support and metabolic recovery
          </div>
        </div>

        {/* Product Highlights */}
        <div
          style={{
            display: 'flex',
            marginTop: 60,
            gap: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 32px',
              backgroundColor: 'rgba(0, 208, 54, 0.1)',
              borderRadius: 12,
              border: '2px solid rgba(0, 208, 54, 0.3)',
            }}
          >
            <span style={{ fontSize: 28, color: '#00D036', fontWeight: 600 }}>
              ✓ Core
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 32px',
              backgroundColor: 'rgba(255, 122, 0, 0.1)',
              borderRadius: 12,
              border: '2px solid rgba(255, 122, 0, 0.3)',
            }}
          >
            <span style={{ fontSize: 28, color: '#FF7A00', fontWeight: 600 }}>
              ✓ MitoFuel
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 32px',
              backgroundColor: 'rgba(0, 163, 232, 0.1)',
              borderRadius: 12,
              border: '2px solid rgba(0, 163, 232, 0.3)',
            }}
          >
            <span style={{ fontSize: 28, color: '#00A3E8', fontWeight: 600 }}>
              ✓ Nasal Sprays
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
