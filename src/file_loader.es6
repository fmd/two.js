function performFetchRequest(url) {
  return new Promise(function(resolve, reject) {
    let req = new XMLHttpRequest()
    req.open('GET', url)
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response)
      } else {
        reject(Error(req.statusText))
      }
    }

    req.onerror = function() {
      reject(Error('Could not load ' + url))
    }

    req.send()
  })
}

export function fetchFile(path) {
  let fetchedData
  performFetchRequest(path).then(function(response) {
    fetchedData = response
  }, function(error) {
    console.error(error)
  })

  console.log(fetchedData)
  return fetchedData
}
