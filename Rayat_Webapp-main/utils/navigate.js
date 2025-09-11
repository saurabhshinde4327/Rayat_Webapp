export const handleSidebarNavigation = (section, router) => {
    const routes = {
      addNews: "/addnews",
      manageNews: "/managenews",
      addNotice: "/addnotice",
      manageNotices: "/managenotices",
      addEvent: "/adddocuments",
      manageEvents: "/managedocuments",
      addGallery: "/addimage",
      addRecentActivity: "/addevents",
      manageRecentActivities: "/manageevents",
    };
  
    if (routes[section]) {
      router.push(routes[section]);
    }
  };
  