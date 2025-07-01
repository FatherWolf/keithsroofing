// src/components/FinancingModule.tsx
import React from 'react';
import { Box, Link } from '@mui/material';

export default function FinancingModule() {
  return (
    <Box
      className="financing-module"
      sx={{
        boxSizing: 'border-box',
        m: 0,
        textAlign: 'left',
        border: '5px solid #207e20',
        width: 330,
        borderRadius: 1,
        '& img': {
          display: 'block',
          width: '100%',
          maxWidth: 320,
        },
      }}
    >
      <Box
        component="img"
        src="https://www.greensky.com/merchantkit/images/finance_buttons/headers/header_320.jpg?v=3.0.612"
        alt="Financing Options from GreenSky"
        tabIndex={0}
      />
      <Box
        component="img"
        src="https://www.greensky.com/merchantkit/images/finance_buttons/product_headers/roofing_product_header_320.jpg?v=3.0.612"
        alt="Finance Your Project"
        tabIndex={0}
      />
      <Link
        href="https://projects.greensky.com/MerchantLoanApplication?apptype=short&merchant=81118803&dealerplan=9991&channel=External-Button-03"
        target="_blank"
        tabIndex={0}
        underline="none"
      >
        <Box
          component="img"
          src="https://www.greensky.com/merchantkit/images/finance_buttons/plans/9991_320x100.jpg?v=3.0.612"
          alt="Plan 9991"
        />
      </Link>
      <Box
        component="img"
        src="https://www.greensky.com/merchantkit/images/finance_buttons/footers/footer_320.jpg?v=3.0.612"
        alt="*Subject to credit approval. These examples are estimates only. Actual payment amounts based on amount and timing of purchases. Call 866-936-0602 for financing costs and terms. Loans for the GreenSky® consumer loan program are provided by Synovus Bank, Member FDIC, NMLS #408043, without regard to age, race, color, religion, national origin, gender, disability, or familial status. GreenSky Servicing, LLC services the loans on behalf of your lender, NMLS #1416362. www.nmlsconsumeraccess.org. GreenSky® is a registered trademark of GreenSky, LLC and is licensed to banks and other financial institutions for their use in connection with that consumer loan program. GreenSky Servicing, LLC is a financial technology company that manages the GreenSky® consumer loan program by providing origination and servicing support to banks and other financial institutions that make or hold program loans. GreenSky, LLC and GreenSky Servicing, LLC are not lenders. All credit decisions and loan terms are determined by program lenders."
        tabIndex={0}
      />
    </Box>
  );
}
