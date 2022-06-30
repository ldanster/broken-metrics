import {register, requestMetrics, metrics} from "../src/utils/metrics";

export const getServerSideProps = async () => {

  requestMetrics.labels('page_request', 'index_page').inc()

  console.log(metrics)

  return {
    props: {
      content: register.metrics()
    }
  }
}

export default function Home({content}) {

  console.log(content)
  return (
    <div>
      {content}
    </div>
  )
}
