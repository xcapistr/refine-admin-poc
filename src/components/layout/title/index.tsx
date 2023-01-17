import React from 'react'
import { TitleProps } from '@pankod/refine-core'
import { Link } from '@pankod/refine-nextjs-router'

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
  <Link to="/">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '64px'
      }}
    >
      {collapsed ? (
        <p
          style={{
            margin: 0,
            fontFamily: '"Agrandir"',
            fontSize: '28px'
          }}
        >
          E
        </p>
      ) : (
        <>
          <p
            style={{
              margin: 0,
              fontFamily: '"Agrandir"',
              fontSize: '24px'
            }}
          >
            EARNIST
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: '"Agrandir"',
              whiteSpace: 'nowrap',
              fontSize: '12px'
            }}
          >
            ADMIN PORTAL
          </p>
        </>
      )}
    </div>
  </Link>
)
