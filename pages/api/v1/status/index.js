function status(request, response) {
  response.status(200).json({ chave: "meus gatos são lindos" });
}

export default status;
