import { useEffect, useState } from "react";

const gql = String.raw;

const deets = gql`
    name
    _id
    image {
        asset {
            url
            metadata {
                lqip
            }
        }
    }
`

export default function useLatestData() {
    // hot slices
    const [hotSlices, setHotSlices] = useState();
    // slicemasters
    const [slicemasters, setSlicemasters] = useState();
    // Use a side effent to fetch he data from the qraphql endpoint
    useEffect(function() {
        // when the component loads, fetch the data
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: gql`
                    query {
                        StoreSettings(id: "downtown") {
                            name
                            slicemaster {
                                ${deets}
                            }
                            hotSlices {
                                ${deets}
                            }
                        }
                    }
                `,
            })
        }).then((res) => res.json()).then((res) => {
            // TODO: check for error
            // set the data to state
            setHotSlices(res.data.StoreSettings.hotSlices);
            setSlicemasters(res.data.StoreSettings.slicemaster);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return {
        hotSlices,
        slicemasters
    };
}