class WorkflowsController {
  checkIn(req, res) {
    res.status(200).json({ success: true });
  }
}

module.exports = new WorkflowsController();
