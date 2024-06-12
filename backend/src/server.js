import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { 
  fetchBinanceTickers, 
  fetchBinanceLineChart, 
  fetchBinanceCandleChart 
} from './api/binance.js'

const port = 3001

const app = express()

app.use(cors())

app.get('/tickers', async (req, res, _) => {
  try {
    const exchangeInfo = await fetchBinanceTickers()
    res.json(exchangeInfo)
  } catch (error) {
    res.status(500).json(error.response ? error.response.data : error.message)
  }
})

app.get('/uiKlines', async (req, res, _) => {
  const { symbol, interval } = req.query

  if(!symbol || !interval) return res.status(422).send('Symbol and Interval are required.')

  try {
    const candles = await fetchBinanceCandleChart(symbol, interval)
    res.json(candles)
  } catch (error) {
    res.status(500).json(error.response ? error.response.data : error.message)
  }
})

app.get('/klines', async (req, res, _) => {
  const { symbol, interval } = req.query

  if(!symbol || !interval) return res.status(422).send('Symbol and Interval are required.')

  try {
    const lines = await fetchBinanceLineChart(symbol, interval)
    res.json(lines)
  } catch (error) {
    res.status(500).json(error.response ? error.response.data : error.message)
  }
})


app.listen(port)
console.log(`Server listening on ${port}...`)
