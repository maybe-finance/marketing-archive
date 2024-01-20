module ApplicationHelper
  def title(page_title)
    content_for(:title) { page_title }
  end
  
  def description(page_description)
    content_for(:description) { page_description }
  end
  
  def meta_image(meta_image)
    content_for(:meta_image) { meta_image }
  end

  def legacy()
    content_for(:legacy) { "legacy" }
  end
end
