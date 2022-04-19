# react-rethinkable
Enhance fetching resources via the ability to cancel HTTP requests.

## Installation

```
npm i react-thinkable
```

## Usage

```javascript
import React from 'react';
import useRethinkable from 'react-rethinkable';

function Component() {
    const { data, loading, error, cancel } = useRethinkable((controller) => {
        let url = "https://jsonplaceholder.typicode.com/posts";
        return fetch(url, { signal: controller.signal });
    });
    
    return (
        <React.Fragment>
            <div>
                {loading && <span>loading...</span>}
                {error && <span>Error occured...</span>}
                {data && <span>Date is fetched...</span>}
            </div>
            <button onClick={() => cancel()}>
                cancel fetch
            </button>
            <div>
                {
                    JSON.stringify({ loading, data: data?.length, error })
                }
            </div>
        </React.Fragment>
    );
}
```