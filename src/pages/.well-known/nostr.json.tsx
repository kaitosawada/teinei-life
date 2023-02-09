import React from "react";

const Nostr = () => <></>;

export async function getServerSideProps({ req, res, _context, query }) {
  if (query.name && query.name === "teineilife") {
    const data = {
      names: {
        teineilife:
          "npub1dj9crxkay9za4x9hp8405ghzx9vc9m4nw35pu9u60jyfp8x6jzrqsnvq8t",
      },
    };
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.write(JSON.stringify(data));
    res.end();
  }
  return { props: {} };
}

export default Nostr;
