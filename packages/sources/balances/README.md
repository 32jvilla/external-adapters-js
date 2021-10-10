# Chainlink External Adapter for Balances

### Environment Variables

None

---

### Input Parameters

| Required? |   Name   |     Description     |            Options            | Defaults to |
| :-------: | :------: | :-----------------: | :---------------------------: | :---------: |
|           | endpoint | The endpoint to use | [sum](#Sum-Endpoint) [minMax](#MinMax-Endpoint) |   sum   |

---

## Sum Endpoint

This returns the sum of the address' holdings

### Input Params

None

### Sample Input

```json
{
  "id": "1",
  "data": {
    "endpoint": "sum",
  }
}
```

### Sample Output

```json
{
  "jobRunID":"1",
  "result":462122230678539,
  "statusCode":200,
  "data":{"result":462122230678539}
}
```
