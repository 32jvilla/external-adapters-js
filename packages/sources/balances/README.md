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

## MinMax Endpoint

This returns the address of either the smallest or largest holder

### Input Params

| Required? |      Name       |        Description         | Options | Defaults to |
| :-------: | :-------------: | :------------------------: | :-----: | :---------: |
|           |    `min`        | Boolean indicating if you want the address of the smallest holder. Address of largest holder is returned when set to `false` |  `true`, `false`       |     `true         |

### Sample Input

```json
{
  "id": "1",
  "data": {
    "endpoint": "minMax",
    "min" true,
  }
}
```

### Sample Output

```json
{
  "jobRunID":"1",
  "result":"15XPFnJAjPiyTi59BexgHpQBMsA9xzjNn9",
  "statusCode":200,
  "data":{"result":"15XPFnJAjPiyTi59BexgHpQBMsA9xzjNn9"}
}
```
