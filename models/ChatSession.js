import mongoose from 'mongoose';

const chatSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false
  },
  subject: {
    type: String,
    required: true,
    default: 'general'
  },
  mode: {
    type: String,
    enum: ['step-by-step', 'quick-answer'],
    default: 'step-by-step'
  },
  title: {
    type: String,
    default: 'New Chat'
  },
  messageCount: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  isGuest: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'deleted'],
    default: 'active'
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatMessage'
  }],
  metadata: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Index for better performance
chatSessionSchema.index({ userId: 1, status: 1 });
chatSessionSchema.index({ lastActive: -1 });

export default mongoose.models.ChatSession || mongoose.model('ChatSession', chatSessionSchema);