window.addEventListener('load', () => {
  const form = document.querySelector('form')

  form.addEventListener('submit', e => {
    e.preventDefault()

    checkForErrors()
  })
})

function checkForErrors (form) {
  const textInput = document.querySelector('#text input')
  const textError = document.querySelector('#text p')

  const emailInput = document.querySelector('#email input')
  const emailError = document.querySelector('#email p')

  const telInput = document.querySelector('#tel input')
  const telError = document.querySelector('#tel p')

  let error = false

  // name check: require, min 3 max 20
  const requiredName = checkRequired(textInput, textError, 'name is required')
  if (requiredName) {
    const lengthName = checkLength(textInput, textError, 'name', 3, 20)
  } else {
    error = true
  }

  const requiredEmail = checkRequired(emailInput, emailError, 'email is required')
  if (requiredEmail) {
    const lengthEmail = checkLength(emailInput, emailError, 'email', 5, Infinity)
    if (lengthEmail) {
      const emailOk = checkEmail(emailInput, emailError, 'not a valid email')
    } else {
      error = true
    }
  } else {
    error = true
  }

  const requiredTel = checkRequired(telInput, telError, 'tel is required')
  if (requiredTel) {
    const lengthTel = checkLength(telInput, telError, 'tel', 10, 10)
    if (lengthTel) {
      const telOk = checkTel(telInput, telError, 'not a valid phone number')
    } else {
      error = true
    }
  } else {
    error = true
  }

  return !error
}

function checkTel (inputElement, errorElement, message) {
  const expr = /^07[0-9]{8}$/gm
  const regexpEmail = inputElement.value.match(expr)

  if (regexpEmail === null) {
    errorElement.textContent = message
    errorElement.classList.add('visible')
    inputElement.classList.add('error')

    return false
  } else {
    errorElement.textContent = ''
    errorElement.classList.remove('visible')

    return true
  }
}

function checkEmail (inputElement, errorElement, message) {
  const expr = /^[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,}\.[a-zA-Z0-9]{2,3}$/gm
  const regexpEmail = inputElement.value.match(expr)

  if (regexpEmail === null) {
    errorElement.textContent = message
    errorElement.classList.add('visible')
    inputElement.classList.add('error')

    return false
  } else {
    errorElement.textContent = ''
    errorElement.classList.remove('visible')
    inputElement.classList.remove('error')

    return true
  }
}

function checkRequired (inputElement, errorElement, errorMessage) {
  if (inputElement.value.length) {
    errorElement.textContent = ''
    errorElement.classList.remove('visible')
    inputElement.classList.remove('error')

    return true
  } else {
    errorElement.textContent = errorMessage
    errorElement.classList.add('visible')
    inputElement.classList.add('error')

    return false
  }
}

function checkLength (inputElement, errorElement, name, min, max) {
  const value = inputElement.value
  if (value.length >= min) {
    if (value.length <= max) {
      return true
    } else {
      errorElement.textContent = `${name} must be less than ${max + 1} chars`
      errorElement.classList.add('visible')
      inputElement.classList.add('error')

      return false
    }
  } else {
    if (min !== max) {
      errorElement.textContent = `${name} must be greater than ${min - 1} chars`
    } else {
      errorElement.textContent = `${name} must be exactly ${min} chars`
    }
    errorElement.classList.add('visible')
    inputElement.classList.add('error')

    return false
  }
}